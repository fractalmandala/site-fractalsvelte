"""Builds the site's fonts from the full variable sources in fonts/source/.

- static/fonts/*.woff2: web fonts trimmed to the axes the site actually varies
  (weight, plus optical size for Flex). Google Sans Flex goes from 1.9 MB to ~130 KB.
- og/fonts/*.ttf: static instances for the share-image renderer (satori reads
  TTF/OTF only, and not variable fonts).

Needs fontTools and brotli:  python3 -m venv .venv && .venv/bin/pip install fonttools brotli
Then:                         .venv/bin/python scripts/build-fonts.py
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.join(os.path.dirname(__file__), '..')
FLEX = os.path.join(ROOT, 'fonts/source/GoogleSansFlex.woff2')
CODE = os.path.join(ROOT, 'fonts/source/googlesanscode.woff2')
FLEX_PINNED = {'wdth': 100, 'GRAD': 0, 'ROND': 0, 'slnt': 0}


def build(src, limits, dest, flavor):
    font = instancer.instantiateVariableFont(TTFont(src), limits)
    font.flavor = flavor
    path = os.path.join(ROOT, dest)
    font.save(path)
    print(f'{dest}  {os.path.getsize(path) // 1024} KB')


build(FLEX, {**FLEX_PINNED, 'wght': (400, 800)}, 'static/fonts/google-sans-flex.woff2', 'woff2')
build(CODE, {'MONO': 1, 'wght': (400, 600)}, 'static/fonts/google-sans-code.woff2', 'woff2')

for weight in (400, 700, 800):
    build(FLEX, {**FLEX_PINNED, 'opsz': 18, 'wght': weight}, f'og/fonts/GoogleSansFlex-{weight}.ttf', None)
build(CODE, {'MONO': 1, 'wght': 500}, 'og/fonts/GoogleSansCode-500.ttf', None)
