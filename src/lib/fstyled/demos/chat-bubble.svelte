<script lang="ts">
	import { ChatBubble } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-sm wfull">
	<ChatBubble role="system" message="Today" />
	<ChatBubble
		role="assistant"
		message="How can I help with your design system?"
		timestamp="10:02"
	/>
	<ChatBubble
		role="user"
		message="Port the components to fractalstyler."
		timestamp="10:03"
		status="read"
	/>
	<ChatBubble role="user" message="And document them." timestamp="10:04" status="sending" />
</div>
