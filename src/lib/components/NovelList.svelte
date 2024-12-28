<script lang="ts">
	import { novelList } from '$lib/novels/dict';
	import NovelCard from '$lib/components/NovelCard.svelte';
	import { Container } from '@sveltestrap/sveltestrap';
</script>

<Container class="my-3">
	{#each novelList as [id, novel]}
		<NovelCard {novel} {id} />
	{/each}
</Container>
