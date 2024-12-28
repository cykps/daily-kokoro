<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/components/Title.svelte';
	import Description from '$lib/components/Description.svelte';
	import Letter from '$lib/components/Letter.svelte';
	import { subscribe as subscribeNotification } from '$lib/scripts/notification';
	import {
		Modal,
		Button,
		Progress,
		Pagination,
		PaginationItem,
		PaginationLink,
		Spinner
	} from '@sveltestrap/sveltestrap';
	import { writable } from 'svelte/store';
	import { putEpisodeIdx, getEpisodeIdx } from '$lib/components/scripts/indexedDB';

	/* Novel */
	let { data }: { data: PageData } = $props();
	const novel = data.novel;
	const id = data.id;
	const episodeCount = novel.html.length;

	const episodeIdx = writable(0);

	/* Source Summary */
	const isSourceSummaryOpen = writable(false);
	const sourceSummaryToggle = () => {
		isSourceSummaryOpen.update((v) => !v);
	};

	/* Subscription Button */
	const SubscriptionStatus = {
		NotSubscribed: 0,
		SubscriptingProcessing: 1,
		Subscribing: 2
	} as const;
	const subscriptionStatus = writable(SubscriptionStatus.NotSubscribed);
	const isSubscribing = writable(false);
	const isSubscriptingProcessCompleted = writable(false);
	async function subscribe(e) {
		subscriptionStatus.set(SubscriptionStatus.Subscribing);
		try {
			await subscribeNotification();
			await putEpisodeIdx(id, 1);
		} catch {
			console.log('fail');
			return;
		}
		console.log('success');
		subscriptionStatus.set(SubscriptionStatus.Subscribing);
	}
</script>

<!-- HEADER -->
<Title text={novel.title} />
<Description text={novel.summary} />

<main>
	<!-- Progress Bar -->
	<Progress value={$episodeIdx + 1} max={episodeCount} color="secondary" class="mb-2">
		{Math.ceil((($episodeIdx + 1) / episodeCount) * 100)}% [{$episodeIdx + 1}/{episodeCount}]
	</Progress>

	<!-- Novel Prop -->
	<div class="my-5">
		<h1 class="text-center fw-bold">{novel.title}</h1>
		<h2 class="text-center">{novel.author}</h2>
	</div>

	<!-- Novel -->
	<Letter html={novel.html[$episodeIdx]}></Letter>

	<!-- Source -->
	<p class="my-3 text-center">
		{#if 'url' in novel.source}
			<span>ソース情報: <a href={novel.source.url}>{novel.source.text}</a></span>
		{:else}
			<span>ソース情報: {novel.source.text}</span>
		{/if}
		{#if 'summary' in novel.source}
			<Button class="mx-1" color="primary" on:click={sourceSummaryToggle} outline size="sm"
				>詳細</Button
			>
			<Modal body isOpen={$isSourceSummaryOpen} toggle={sourceSummaryToggle}>
				{@html novel.source.summary}
			</Modal>
		{/if}
	</p>

	<!-- Register -->
	<div class="text-center my-5">
		<p class="my-1">
			<Button
				color="primary"
				size="lg"
				onclick={subscribe}
				disabled={$subscriptionStatus !== SubscriptionStatus.NotSubscribed}
			>
				{#if $subscriptionStatus === SubscriptionStatus.NotSubscribed}講読する{/if}
				{#if $subscriptionStatus === SubscriptionStatus.SubscriptingProcessing}
					<Spinner type="border" color="light" size="sm" />
				{/if}
				{#if $subscriptionStatus === SubscriptionStatus.Subscribing}講読済み{/if}
			</Button>
		</p>
		<p class="text-black-50">毎朝8時に一話ごと通知されます</p>
	</div>

	<!-- Pagination -->
	<div class="pagination-outer text-center">
		<Pagination ariaLabel="Page navigation" size="sm">
			<PaginationItem>
				<PaginationLink
					first
					href="#"
					onclick={() => {
						episodeIdx.update((v) => v - 10);
					}}
				/>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					previous
					onclick={() => {
						episodeIdx.update((v) => v - 1);
					}}
				/>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					onclick={() => {
						episodeIdx.update((v) => v - 5);
					}}>{$episodeIdx - 4}</PaginationLink
				>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					onclick={() => {
						episodeIdx.update((v) => v - 2);
					}}>{$episodeIdx - 1}</PaginationLink
				>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					onclick={() => {
						episodeIdx.update((v) => v - 1);
					}}>{$episodeIdx}</PaginationLink
				>
			</PaginationItem>
			<PaginationItem active>
				<PaginationLink>{$episodeIdx + 1}</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					onclick={() => {
						episodeIdx.update((v) => v + 1);
					}}>{$episodeIdx + 2}</PaginationLink
				>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					onclick={() => {
						episodeIdx.update((v) => v + 2);
					}}>{$episodeIdx + 3}</PaginationLink
				>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					onclick={() => {
						episodeIdx.update((v) => v + 4);
					}}>{$episodeIdx + 6}</PaginationLink
				>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					next
					onclick={() => {
						episodeIdx.update((v) => v + 1);
					}}
				/>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink
					last
					onclick={() => {
						episodeIdx.update((v) => v + 10);
					}}
				/>
			</PaginationItem>
		</Pagination>
	</div>
</main>

<style>
	main {
		margin: 0.8em 0;
	}

	.pagination-outer {
		display: flex;
		justify-content: center;
	}
</style>
