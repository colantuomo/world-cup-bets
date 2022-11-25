<script lang="ts">
	import { initializeFirebase } from '$lib/firebase';
	import { getPlayerMatchesWithBets } from '../../../services';
	import { onMount } from 'svelte';
	import { Moon } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GroupLabel from '../../../components/groupLabel.svelte';
	import { Groups, type GroupIndex, type MatchesData } from '../../../types';
	const { auth } = initializeFirebase();

	export let data: { id: string };
	export let promise: Promise<MatchesData> | undefined;
	let userName: string | null = null;

	function getNameByGroupIndex(index: string) {
		return Groups[index as GroupIndex].toString();
	}

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			userName = sessionStorage.getItem('rankingUserName');
			if (userName === null) {
				window.location.href = '/';
				return;
			}
			if (user === null) {
				window.location.href = '/login';
				return;
			}
			promise = getPlayerMatchesWithBets(user.uid, data.id);
		});
	});
</script>

<svelte:head>
	<title>World Cup Bets - Apostas: {userName ?? ''}</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if promise === undefined}
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div transition:fade={{ delay: 1500, duration: 1500, easing: quintOut }}>
			<Moon />
		</div>
	</div>
{:else}
	{#await promise then data}
		{#if data !== null}
			<div
				class="bg-yellow-400 h-20 sticky top-0 flex gap-1 justify-center items-center flex-col z-20"
			>
				<div class="flex gap-2 text-sm md:text-base">
					<p>Você está vendo as apostas de:</p>
					<p class="font-bold">{userName}</p>
				</div>
				<div class="flex gap-4 text-sm underline font-semibold">
					<button on:click={() => (window.location.href = '/')}>Minhas apostas</button>
					<button on:click={() => (window.location.href = '/ranking')}>Ranking</button>
				</div>
			</div>
			<section
				transition:fade={{ delay: 500, duration: 1500, easing: quintOut }}
				class="container mx-auto px-4 md:w-4/5"
			>
				<div class="flex flex-col gap-5">
					{#if data && Object.values(data).length > 0}
						{#each Object.values(data) as group, i}
							<GroupLabel name={getNameByGroupIndex(Object.keys(data)[i])} matches={group} />
						{/each}
					{/if}
				</div>
			</section>
		{/if}
	{/await}
{/if}
