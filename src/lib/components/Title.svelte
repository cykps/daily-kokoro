<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let text: string;

	const serviceName = '毎日こゝろ';
	let isRoot = false;

	onMount(() => {
		isRoot = $page.url.pathname === '/' ? true : false;
	});
</script>

<svelte:head>
	<title>{text}｜{serviceName}</title>
</svelte:head>
