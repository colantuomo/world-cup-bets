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
		<div transition:fade={{ delay: 250, duration: 1500, easing: quintOut }}>
			<Moon />
		</div>
	</div>
{:else}
	{#await promise then data}
		{#if data !== null}
			<section
				transition:fade={{ delay: 250, duration: 1500, easing: quintOut }}
				class="container mx-auto px-4"
			>
				<div class="flex flex-col items-center py-4">
					<img class="w-32" alt="Main logo" src={logo} />
					<h2 class="text-lg text-center font-semibold text-gray-500">
						{currentUser?.displayName}
					</h2>
				</div>
				<div class="flex flex-col gap-5">
					{#if Object.values(data).length > 0}
						{#each Object.values(data) as group, i}
							<GroupLabel name={Object.keys(data)[i]} matches={group} />
						{/each}
					{/if}
				</div>
			</section>
		{/if}
	{/await}
{/if}
