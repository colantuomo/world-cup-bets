<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GroupLabel from '../../../components/groupLabel.svelte';
	import { Groups, type GroupIndex, type MatchesData, type PageLoadData } from '../../../types';
	import { onMount } from 'svelte';
	import { isABigUserName } from '../../../helpers/validations';

	export let data: PageLoadData<MatchesData>;

	const matches = data.response;
	const BIG_USER_NAME_SIZE = 26;
	let userName: string | null;

	function getNameByGroupIndex(index: string) {
		const groupName = Groups[index as GroupIndex];
		if (groupName) {
			return groupName.toString();
		}
		return index;
	}

	$: bigUserName = isABigUserName(userName ?? '');

	onMount(() => {
		userName = sessionStorage.getItem('rankingUserName');
	});
</script>

<svelte:head>
	<title>World Cup Bets - Apostas: {data.locals.userName ?? ''}</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if data !== null}
	<div class="bg-yellow-400 h-20 sticky top-0 flex gap-1 justify-center items-center flex-col z-20">
		<div class={`flex gap-1 text-sm md:text-base ${bigUserName ? 'flex-col' : ''}`}>
			<p>Você está vendo as apostas de:</p>
			<p class="font-bold">{userName ?? ''}</p>
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
			{#if matches && Object.values(matches).length > 0}
				{#each Object.values(matches) as group, i}
					<GroupLabel name={getNameByGroupIndex(Object.keys(matches)[i])} matches={group} />
				{/each}
			{/if}
		</div>
	</section>
{/if}
