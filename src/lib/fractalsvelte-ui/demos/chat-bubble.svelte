<script lang="ts">
	import { ChatBubble } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="box fs-measure-md gap-md">
	<ChatBubble
		message="Can I use this component library without installing Tailwind CSS?"
		role="user"
		timestamp="10:42 AM"
	/>
	<ChatBubble
		message="Absolutely. Every component uses 100% scoped CSS variables and pure data attributes."
		role="assistant"
		timestamp="10:43 AM"
	/>
</div>
