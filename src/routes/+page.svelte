<script lang="ts">
	import GroupLabel from '../components/groupLabel.svelte';
	import { initializeFirebase } from '../lib/firebase';
	import logo from '$lib/images/logo.png';
	import { Groups, type GroupIndex, type MatchesData, type PageLoadData } from '../types';
	import Button from '../components/button.svelte';
	import { userStore } from '../stores';
	import { onMount } from 'svelte';
	import type { Auth } from 'firebase/auth';

	const auth: Auth = initializeFirebase().auth;

	export let data: PageLoadData<MatchesData>;
	userStore.set({ userId: data.locals.userId, userName: data.locals.userName });
	export let loading: boolean;

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
		auth?.signOut();
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
					{loading}
					text="Ranking"
					type="Secondary"
					on:click={() => {
						loading = true;
						window.location.href = '/ranking';
					}}
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
