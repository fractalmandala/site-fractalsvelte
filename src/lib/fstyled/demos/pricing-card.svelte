<script lang="ts">
	import { PricingCard } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="grid-2 gap-md wfull">
	<PricingCard
		tier="Starter"
		price="$0"
		description="For side projects."
		features={['1 project', 'Community support']}
	/>
	<PricingCard
		tier="Pro"
		price="$24"
		popular
		description="For teams."
		features={['Unlimited projects', 'Priority support', 'SSO']}
	/>
</div>
