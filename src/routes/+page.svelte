<script lang="ts">
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Moon } from 'svelte-loading-spinners';
	import type { MatchesData } from '../types';
	import GroupLabel from '../components/groupLabel.svelte';
	import { initializeFirebase } from '../lib/firebase';
	import type { User } from 'firebase/auth';

	export let data: MatchesData;
	const { auth } = initializeFirebase();

	let currentUser: User;
	let groups: any = [];
	groups = Object.values(data?.groups);
	const groupsName = Object.keys(data.groups);

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			console.log('auth state changed', user);
			if (user === null) {
				window.location.href = '/login';
				return;
			}
			currentUser = user;
		});
	});
</script>

<svelte:head>
	<title>Daniel do Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if !currentUser}
	<div class="container mx-auto flex justify-center pt-60 absolute">
		<div transition:fade={{ delay: 250, duration: 1500, easing: quintOut }}>
			<Moon />
		</div>
	</div>
{:else}
	<section
		transition:fade={{ delay: 250, duration: 1500, easing: quintOut }}
		class="container mx-auto px-4"
	>
		<div class="py-4">
			<h1 class="text-3xl text-center font-bold">Daniel do Bets</h1>
			<h2 class="text-lg text-center font-semibold">{currentUser?.displayName}</h2>
		</div>
		<div class="flex flex-col gap-5">
			{#if groups.length > 0}
				{#each groups as group, i}
					<GroupLabel name={groupsName[i]} matches={group} />
				{/each}
			{/if}
		</div>
	</section>
{/if}
