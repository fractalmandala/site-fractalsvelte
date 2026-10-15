// GLSL for MascotGL.svelte: heightfield ray-march of the 2D mascot art.
// World units: 1.0 = mascot width (1024 art px). x right, y up, z toward viewer.

export const VERT = /* glsl */ `#version 300 es
in vec2 a_pos;
uniform float u_extent;
out vec2 v_s;
void main() {
	v_s = a_pos * u_extent;
	gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

export const FRAG = /* glsl */ `#version 300 es
precision highp float;
in vec2 v_s;
out vec4 o;

uniform sampler2D u_albedo;   // RGBA art, pupils removed
uniform sampler2D u_normal;   // RGB object-space normal
uniform sampler2D u_data;     // R height/hmax, G ambient occlusion, B blurred silhouette (80%, padded)
uniform mat3 u_rot;           // object -> world rotation
uniform vec2 u_offset;        // object translation in world (bob)
uniform vec3 u_light;         // world light direction
uniform vec3 u_gaze[2];       // world gaze direction per eye
uniform vec3 u_lid[2];        // eyelid skin colour per eye
uniform float u_blink;        // 0 open .. 1 closed
uniform float u_lit;          // 0 = 2.5D parallax only, 1 = full lighting
uniform float u_hmax;         // max height (world)
uniform float u_px;           // world units per device pixel
uniform float u_lod;          // texture lod for the current scale
uniform float u_extent;       // canvas half-extent (world)
uniform int u_steps;          // ray-march steps (<= 96; fewer at small sizes)
uniform float u_shadow;       // drop shadow strength multiplier

// Eye geometry measured from the 1024px art (see Mascot.svelte).
const vec2 EYE_C0 = vec2(302.5 / 1024.0 - 0.5, 0.5 - 611.0 / 1024.0);
const vec2 EYE_C1 = vec2(718.0 / 1024.0 - 0.5, 0.5 - 611.0 / 1024.0);
const float EYE_R0 = 113.3 / 1024.0;
const float EYE_R1 = 113.7 / 1024.0;
const float BALL_R = 150.0 / 1024.0;     // virtual eyeball radius (visible cap = sclera)
const float COS_PUPIL = 0.8525;          // asin(78.4 / 150)
const float COS_HL1 = 0.97784;           // asin(31.4 / 150)
const float COS_HL2 = 0.98797;           // asin(23.2 / 150)
const float MAX_GAZE = 0.26;             // rad, keeps the pupil inside the sclera
const vec3 PUPIL = vec3(0.004, 0.004, 0.063);
// Half-vector that puts the big highlight where the art has it (+30.8, -31.2 px).
const vec3 HL_REST = vec3(0.205, 0.208, 0.956);

vec2 toUV(vec2 p) { return vec2(p.x + 0.5, 0.5 - p.y); }
bool inside(vec2 uv) { return all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0))); }
float heightAt(vec2 p) {
	vec2 uv = toUV(p);
	return inside(uv) ? textureLod(u_data, uv, 0.0).r * u_hmax : 0.0;
}

vec3 clampGaze(vec3 g) {
	float mc = cos(MAX_GAZE);
	if (g.z < mc) {
		vec2 xy = length(g.xy) > 1e-5 ? normalize(g.xy) : vec2(0.0);
		g = vec3(xy * sin(MAX_GAZE), mc);
	}
	return g;
}

// Returns eye colour, writes coverage and eyeball normal.
vec3 shadeEye(vec2 p, vec2 c, float sr, vec3 gazeW, vec3 lid, mat3 inv, vec3 hv, vec3 base, out float cover, out vec3 ne) {
	vec2 q = p - c;
	float r = length(q);
	cover = 1.0 - smoothstep(sr - u_px, sr + u_px, r);
	vec2 qn = q / BALL_R;
	ne = vec3(qn, sqrt(max(1.0 - dot(qn, qn), 0.0)));
	if (cover <= 0.0) return base;
	vec3 g = clampGaze(normalize(inv * gazeW));
	// AA widths in cosine space: d(cos)/d(angle) = sin(angle) at each disc edge
	float aa = 1.2 * u_px / BALL_R;
	float aaP = aa * 0.523, aaH1 = aa * 0.209, aaH2 = aa * 0.155;
	float pup = smoothstep(COS_PUPIL - aaP, COS_PUPIL + aaP, dot(ne, g));
	vec3 h1 = hv;
	vec3 h2 = normalize(vec3(-hv.xy * 1.12, hv.z));
	float s1 = smoothstep(COS_HL1 - aaH1, COS_HL1 + aaH1, dot(ne, h1));
	float s2 = smoothstep(COS_HL2 - aaH2, COS_HL2 + aaH2, dot(ne, h2));
	// faint depth inside the pupil, darker toward its rim
	vec3 pupilCol = PUPIL + vec3(0.03, 0.03, 0.07) * smoothstep(COS_PUPIL, 1.0, dot(ne, g)) * 0.6;
	vec3 col = mix(base, pupilCol, pup);
	col = mix(col, vec3(0.992), max(s1, s2));
	// eyelid sweeping down from the top of the sclera
	if (u_blink > 0.001) {
		float yl = q.y / sr;
		float edge = 1.0 - 2.1 * u_blink;
		float ea = 2.0 * u_px / sr;
		float lidM = smoothstep(edge - ea, edge + ea, yl);
		float lineM = lidM * (1.0 - smoothstep(edge + 0.1 - ea, edge + 0.1 + ea, yl));
		col = mix(col, mix(lid, PUPIL, lineM), lidM);
	}
	return col;
}

void main() {
	mat3 inv = transpose(u_rot);
	vec3 ro = inv * vec3(v_s - u_offset, 2.0);
	vec3 rd = inv * vec3(0.0, 0.0, -1.0);

	// march the slab z in [0, hmax]
	float t0 = (ro.z - u_hmax) / -rd.z;
	float t1 = ro.z / -rd.z;
	const int N = 96;
	float dt = (t1 - t0) / float(u_steps);
	float t = t0, tp = t0;
	bool hit = false;
	for (int i = 0; i <= N; i++) {
		if (i > u_steps) break;
		vec3 p = ro + rd * t;
		float h = heightAt(p.xy);
		if (h > 0.0004 && p.z <= h) { hit = true; break; }
		tp = t;
		t += dt;
	}

	vec3 Lw = normalize(u_light);
	// soft drop shadow on the page plane behind the mascot
	// offset grows as the light swings; a small downward bias keeps it 'below' the floating mascot
	vec2 sp = v_s - u_offset + Lw.xy / max(Lw.z, 0.45) * 0.05 + vec2(0.0, 0.03);
	vec2 suv = vec2(sp.x * 0.8 + 0.5, 0.5 - sp.y * 0.8); // silhouette baked at 80% with padding
	float sh = inside(suv) ? textureLod(u_data, suv, 0.0).b : 0.0;
	sh *= 0.30 * u_shadow * (1.0 - u_offset.y * 6.0);
	float edge = max(abs(v_s.x), abs(v_s.y));
	sh *= 1.0 - smoothstep(u_extent * 0.8, u_extent * 0.98, edge);

	if (!hit) { o = vec4(0.0, 0.0, 0.0, sh); return; }

	float a = tp, b = t;
	for (int i = 0; i < 6; i++) {
		float m = 0.5 * (a + b);
		vec3 p = ro + rd * m;
		float h = heightAt(p.xy);
		if (h > 0.0004 && p.z <= h) b = m; else a = m;
	}
	vec3 p = ro + rd * b;
	vec2 uv = toUV(p.xy);
	vec4 alb = textureLod(u_albedo, uv, u_lod);
	vec3 n = normalize(textureLod(u_normal, uv, u_lod).xyz * 2.0 - 1.0);
	float ao = textureLod(u_data, uv, 0.0).g;
	vec3 V = inv * vec3(0.0, 0.0, 1.0);
	vec3 L = inv * Lw;
	vec3 hv = u_lit > 0.5 ? normalize(L + V) : HL_REST;

	vec3 base = alb.rgb;
	float c0, c1; vec3 ne0, ne1;
	base = mix(base, shadeEye(p.xy, EYE_C0, EYE_R0, u_gaze[0], u_lid[0], inv, hv, base, c0, ne0), c0);
	base = mix(base, shadeEye(p.xy, EYE_C1, EYE_R1, u_gaze[1], u_lid[1], inv, hv, base, c1, ne1), c1);
	float eye = max(c0, c1);
	vec3 ne = c0 > c1 ? ne0 : ne1;
	n = normalize(mix(n, ne, eye * (1.0 - u_blink)));

	vec3 col;
	if (u_lit > 0.5) {
		float ndl = max(dot(n, L), 0.0);
		float ndv = max(dot(n, V), 0.0);
		vec3 H = normalize(L + V);
		float ndh = max(dot(n, H), 0.0);
		col = base * mix(0.58, 1.14, ndl) * mix(1.0, ao, 0.85);
		float gloss = mix(1.0, 1.8, eye);
		col += vec3(1.0, 0.97, 0.92) * (pow(ndh, 90.0) * 0.55 + pow(ndh, 14.0) * 0.07 * (1.0 - eye)) * gloss;
		float fres = pow(1.0 - ndv, 3.0);
		float back = max(dot(normalize(-L.xy + 1e-4), normalize(n.xy + 1e-4)), 0.0);
		col += vec3(1.0, 0.74, 0.48) * fres * 0.3 * (0.45 + 0.55 * back) * (1.0 - 0.8 * eye);
		// subsurface-ish warm glow at thin, grazing edges
		col += vec3(1.0, 0.36, 0.08) * pow(1.0 - ndv, 2.2) * 0.2 * (1.0 - eye);
	} else {
		col = base * mix(1.0, ao, 0.3);
	}
	float alpha = alb.a;
	o = vec4(col * alpha, alpha) + vec4(0.0, 0.0, 0.0, sh * (1.0 - alpha));
}`;
