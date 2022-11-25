<script lang="ts">
	import { Moon } from 'svelte-loading-spinners';
	import { editBets, saveBets } from '../services';
	import { userStore, type LocalsUser } from '../stores';
	import type { Bet, Match } from '../types';
	import Card from './card.svelte';
	import { toasts } from '../helpers/toast';

	export let name: string;
	export let matches: Match[];

	let currentUser: LocalsUser;
	let bets: Bet[] = [];
	let isLoading: boolean;

	$: dontHaveABet = bets.length === 0;

	userStore.subscribe((user) => (currentUser = user));

	async function sendBets() {
		isLoading = true;
		try {
			const oldBets = bets.filter(({ id }) => id !== undefined);
			const newBets = bets.filter(({ id }) => id === undefined);
			if (newBets.length > 0) {
				await saveBets(currentUser.userId, bets);
			}
			if (oldBets.length > 0) {
				await editBets(currentUser.userId, bets);
			}
			toasts.success('Aposta feita com sucesso!');
			bets = [];
		} catch (error: any) {
			bets = [];
			toasts.error(error.message[0]);
		}
		isLoading = false;
	}

	function onScoresFilled(bet: CustomEvent<Bet>) {
		const index = bets.findIndex(({ matchId }) => matchId === bet.detail.matchId);
		if (index > -1) {
			bets.splice(index, 1);
		}
		const updatedBet = { ...bet.detail };
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
		disabled={dontHaveABet || isLoading}
		class="flex justify-center bg-blue-500 text-white p-2 rounded-lg font-bold w-52 disabled:bg-gray-300"
		on:click={sendBets}
	>
		{#if isLoading}
			<Moon size={24} color="black" />
		{:else}
			Salvar apostas
		{/if}
	</button>
</div>
