<script lang="ts">
	import type { Novel } from '$lib/novels/record-template';
	import { Card, Button, Icon } from '@sveltestrap/sveltestrap';
	import { id2Path } from '$lib/novels/util';

	export let id: string;
	export let novel: Novel;
</script>

<Card body class="novel-card">
	<div class="mb-2">
		<h3>{novel.title}</h3>

		<Icon class="ms-2" name="feather" />
		<span>{novel.author}</span>

		<Icon name="book" class="ms-1 text-black-50" />
		<span class="text-black-50">全{novel.html.length}話</span>
	</div>
	<p>
		{novel.summary}
	</p>
	<a href={id2Path(id)}>
		<Button color="primary">一話目を読む</Button>
	</a>
</Card>

<style>
	h3 {
		display: inline;
	}
</style>
