<script lang="ts">
	import type { User } from 'firebase/auth';
	import { saveBets } from '../services';
	import { userStore } from '../stores';
	import type { Bet, Match } from '../types';
	import Card from './card.svelte';

	export let name: string;
	export let matches: Match[];

	let currentUser: User;
	let bets: Bet[] = [];

	$: dontHaveABet = bets.length === 0;

	userStore.subscribe((user) => (currentUser = user));

	async function sendBets() {
		await saveBets(currentUser.uid, bets);
		bets = [];
	}

	function onScoresFilled(bet: CustomEvent<Partial<Bet>>) {
		const updatedBet = { ...bet.detail, userId: currentUser.uid };
		bets = [...bets, updatedBet as Bet];
	}
</script>

<div class="flex flex-col gap-5 mb-10">
	<div class="bg-gray-700 text-white p-2 rounded-sm">{name}</div>
	<div class="flex gap-3 flex-wrap justify-center md:justify-start">
		{#each matches as match}
			<Card on:scoresFilled={onScoresFilled} {match} />
		{/each}
	</div>
	<button
		disabled={dontHaveABet}
		class="bg-blue-500 text-white p-2 rounded-lg font-bold w-52 disabled:bg-slate-400"
		on:click={sendBets}>Enviar apostas</button
	>
</div>
