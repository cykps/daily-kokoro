<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Description from '$lib/components/Description.svelte';
	import NovelList from '$lib/components/NovelList.svelte';
</script>

<Title text="小説一覧" />
<Description text="対応している小説の一覧" />

<div class="my-4">
	<h1>小説一覧</h1>
	<NovelList />
</div>
