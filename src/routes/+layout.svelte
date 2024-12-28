<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import { Container } from '@sveltestrap/sveltestrap';
	let { children } = $props();
	import { Styles } from '@sveltestrap/sveltestrap';
  import { pwaInfo } from 'virtual:pwa-info'; 

  let webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<Styles />
<svelte:head>
  {@html webManifestLink}
</svelte:head>

<div class="app">
	<Navbar />

	<Container sm>
		{@render children()}
	</Container>

	<Footer />
</div>
