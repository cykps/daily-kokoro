<script lang="ts">
	import { Container, Icon } from '@sveltestrap/sveltestrap';
	import { serviceName } from '$lib/components/scripts/consts';
</script>

<div class="footer-outer overflow-hidden">
	<Container>
		<div class="d-flex justify-content-between mt-3">
			<p class="h4">{serviceName}</p>
			<div class="h5">
				<a href="https://x.com/Mercury__dev" class="ms-1 text-reset">
					<Icon name="twitter-x" />
				</a>
				<a href="https://github.com/cykps/daily-kokoro" class="ms-1 text-reset">
					<Icon name="github" />
				</a>
			</div>
		</div>
		<div class="d-flex flex-wrap justify-content-between">
			<p><small>&copy; 2024 Merucu</small></p>
			<p>
				<span><Icon name="boxes" class="mx-1" />使用技術</span>
				<span>:</span>
				<a href="https://svelte.dev/" class="text-reset"
					><span><Icon name="file-earmark-code-fill" class="mx-1" />Svelte/SvelteKit</span></a
				>
				<a
					href="https://sveltestrap.js.org/?path=/docs/sveltestrap-overview--docs"
					class="text-reset"><span><Icon name="bootstrap-fill" class="mx-1" />Sveltestrap</span></a
				>
			</p>
		</div>
	</Container>
</div>

<style>
	.footer-outer {
		background-color: lightslategrey;
	}
</style>
