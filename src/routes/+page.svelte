<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GroupLabel from '../components/groupLabel.svelte';
	import { initializeFirebase } from '../lib/firebase';
	import logo from '$lib/images/logo.png';
	import { Groups, type GroupIndex, type MatchesData, type PageLoadData } from '../types';
	import Button from '../components/button.svelte';

	const { auth } = initializeFirebase();

	export let data: PageLoadData<MatchesData>;

	function getMyCurrentTotalPoints(matches: MatchesData) {
		if (!matches) return;
		const groups = Object.values(matches);
		let myPoints = 0;
		groups.forEach((group) => {
			group.forEach(({ totalPoints }) => (myPoints += totalPoints));
		});
		return myPoints;
	}

	function logOut() {
		auth.signOut();
	}

	function getNameByGroupIndex(index: string) {
		return Groups[index as GroupIndex].toString();
	}
</script>

<svelte:head>
	<title>World Cup Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if data !== null}
	<section
		transition:fade={{ delay: 500, duration: 1500, easing: quintOut }}
		class="container mx-auto px-4 md:w-4/5"
	>
		<div class="flex flex-col items-center py-4">
			<img class="w-32 mb-4" alt="Main logo" src={logo} />
			<h2 class="text-lg text-center font-semibold text-gray-500">
				{data.locals.userName}
			</h2>
			<h3 class="text-md text-center text-gray-500">
				Meus pontos atuais: {getMyCurrentTotalPoints(data.response)}
			</h3>
		</div>
		<div class="flex justify-between md:justify-center md:gap-8 py-4">
			<div class="flex gap-2">
				<Button
					loading={false}
					text="Ranking"
					type="Secondary"
					on:click={() => (window.location.href = '/ranking')}
				/>
			</div>
			<Button loading={false} text="Logout" type="Secondary" on:click={logOut} />
		</div>
		<div class="flex flex-col gap-5">
			{#if data.response && Object.values(data.response).length > 0}
				{#each Object.values(data.response) as group, i}
					<GroupLabel name={getNameByGroupIndex(Object.keys(data.response)[i])} matches={group} />
				{/each}
			{/if}
		</div>
	</section>
{/if}
