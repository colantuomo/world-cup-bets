<script lang="ts">
	import type { MatchesData } from '../types';
	import Card from '../components/card.svelte';
	import { initializeFirebase } from '../lib/firebase';

	export let data: MatchesData;
	const { auth } = initializeFirebase();

	let currentUser: any;
	auth.onAuthStateChanged((user) => {
		currentUser = user;
	});
</script>

<svelte:head>
	<title>Daniel do Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

<section class="container mx-auto px-4">
	<h1 class="text-center py-4">Daniel do Bets</h1>
	<div class="flex flex-col gap-5">
		{#each data.matches as match}
			<Card />
		{/each}
	</div>
</section>
