<script lang="ts">
	import GroupLabel from '../../components/groupLabel.svelte';
	import { initializeFirebase } from '../../lib/firebase';
	import { Groups, type GroupIndex, type MatchesData, type PageLoadData } from '../../types';
	import { userStore } from '../../stores';
	import { onMount } from 'svelte';
	import type { Auth } from 'firebase/auth';
	import PageHeader from '../../components/pageHeader.svelte';

	const auth: Auth = initializeFirebase().auth;

	export let data: PageLoadData<MatchesData>;
	userStore.set({ userId: data.locals.userId, userName: data.locals.userName });

	function getMyCurrentTotalPoints(matches: MatchesData) {
		if (!matches) return;
		const groups = Object.values(matches);
		let myPoints = 0;
		groups.forEach((group) => {
			group.forEach(({ totalPoints }) => (myPoints += totalPoints));
		});
		return myPoints;
	}

	function getNameByGroupIndex(index: string) {
		return Groups[index as GroupIndex].toString();
	}

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				window.location.href = '/login';
				return;
			}
		});
	});
</script>

<svelte:head>
	<title>World Cup Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if data !== null}
	<section class="container mx-auto px-4 md:w-4/5">
		<PageHeader
			userName={data.locals.userName}
			currentPoints={getMyCurrentTotalPoints(data.response) ?? 0}
			currentRoute={data.url}
		/>
		<div class="flex flex-col gap-5">
			{#if data.response && Object.values(data.response).length > 0}
				{#each Object.values(data.response) as group, i}
					<GroupLabel name={getNameByGroupIndex(Object.keys(data.response)[i])} matches={group} />
				{/each}
			{/if}
		</div>
	</section>
{/if}
