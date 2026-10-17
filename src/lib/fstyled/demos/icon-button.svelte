<script lang="ts">
	import { IconButton } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luSettings, luStar, luTrash2, luUser } from 'fractalicons/lucide';
</script>

<div class="row ycenter xcenter gap-sm wrap">
	<IconButton label="Settings" size="lg"><Icon icon={luSettings} /></IconButton>
	<IconButton label="Star" variant="primary" size="lg"><Icon icon={luStar} /></IconButton>
	<IconButton label="Delete" variant="destructive" size="lg" shape="round"
		><Icon icon={luTrash2} /></IconButton
	>
	<IconButton label="Profile" variant="iconbox" size="lg"><Icon icon={luUser} /></IconButton>
	<IconButton label="Saving" size="lg" loading><Icon icon={luSettings} /></IconButton>
</div>
