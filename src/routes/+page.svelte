<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Moon } from 'svelte-loading-spinners';
	import GroupLabel from '../components/groupLabel.svelte';
	import { initializeFirebase } from '../lib/firebase';
	import type { User } from 'firebase/auth';
	import logo from '$lib/images/logo.png';
	import { userStore } from '../stores';
	import { getMatchesWithBets } from '../services';
	import type { MatchesData } from '../types';

	const { auth } = initializeFirebase();

	let currentUser: User | undefined;

	let promise: Promise<MatchesData | null>;

	userStore.subscribe((user) => (currentUser = user));

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

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				window.location.href = '/login';
				return;
			}
			userStore.set(user);
			promise = getMatchesWithBets(user.uid);
		});
	});
</script>

<svelte:head>
	<title>World Cup Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if !currentUser}
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div transition:fade={{ delay: 1500, duration: 1500, easing: quintOut }}>
			<Moon />
		</div>
	</div>
{:else}
	{#await promise then data}
		{#if data !== null}
			<section
				transition:fade={{ delay: 500, duration: 1500, easing: quintOut }}
				class="container mx-auto px-4"
			>
				<div class="flex justify-end mb-2">
					<button on:click={logOut} class="p-2 rounded-lg">Logout</button>
				</div>
				<div class="flex flex-col items-center py-4">
					<img class="w-32 mb-4" alt="Main logo" src={logo} />
					<h2 class="text-lg text-center font-semibold text-gray-500">
						{currentUser?.displayName}
					</h2>
					<h3 class="text-md text-center text-gray-500">
						Meus pontos atuais: {getMyCurrentTotalPoints(data)}
					</h3>
				</div>
				<div class="flex flex-col gap-5">
					{#if data && Object.values(data).length > 0}
						{#each Object.values(data) as group, i}
							<GroupLabel name={Object.keys(data)[i]} matches={group} />
						{/each}
					{/if}
				</div>
			</section>
		{/if}
	{/await}
{/if}
