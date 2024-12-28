<script>
	import Title from '$lib/components/Title.svelte';
	import Description from '$lib/components/Description.svelte';
	import { Button } from '@sveltestrap/sveltestrap';
	import { serviceName } from '$lib/components/scripts/consts';
	import NovelList from '$lib/components/NovelList.svelte';
  import { base } from '$app/paths';

	// 1914年からの経過年数を算出
	function calcElapsedYears() {
		const startDate = new Date(1914, 3, 20);
		const currentDate = new Date();
		const elapsedYears = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25));
		return elapsedYears;
	}
</script>

<Title text="ホーム" />
<Description text="ホームだよ" />

<div class="text-center my-5">
	<p class="h1 my-3">{calcElapsedYears()}年前の新聞連載を再現</p>

	<div class="my-2">
		<p class="my-1">夏目漱石の代表作『こゝろ』</p>
		<p class="my-1">1914年(大正3年)4月20日から8月11日まで朝日新聞で連載されました。</p>
	</div>
	<div class="my-2">
		<p class="my-1"><span class="fw-bold">{serviceName}</span>では毎朝一話ごとに通知が送られ、</p>
		<p class="my-1">110日かけて新聞連載のように『こゝろ』を読むことが出来ます。</p>
	</div>
	<div class="my-3">
		<a href="{base}/novels/kokoro">
			<Button color="primary" outline>『こゝろ』の一話目を読む</Button>
		</a>
	</div>
</div>

<div class="my-4">
	<h2>小説一覧</h2>

	<NovelList />
</div>
