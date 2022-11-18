<script lang="ts">
	import { onMount } from 'svelte';
	import type { MatchesData } from '../types';
	import Card from '../components/card.svelte';
	import { initializeFirebase } from '../lib/firebase';

	export let data: MatchesData;
	const { auth } = initializeFirebase();

	let currentUser: any;

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			console.log('auth state changed', user);
			if (user === null) {
				window.location.href = '/login';
			}
			currentUser = user;
		});
	});
</script>

<svelte:head>
	<title>Daniel do Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if currentUser}
	logged as {currentUser.displayName}
{/if}

<section class="container mx-auto px-4">
	<h1 class="text-center py-4">Daniel do Bets</h1>
	<div class="flex flex-col gap-5">
		{#if data?.matches.length > 0}
			{#each data.matches as match}
				<Card />
			{/each}
		{/if}
	</div>
</section>
