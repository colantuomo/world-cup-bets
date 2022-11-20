<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { Moon } from 'svelte-loading-spinners';
	import type { User } from 'firebase/auth';
	import { saveBets } from '../services';
	import { userStore } from '../stores';
	import type { Bet, Match } from '../types';
	import Card from './card.svelte';
	import { toasts } from '../helpers/toast';

	export let name: string;
	export let matches: Match[];

	let currentUser: User;
	let bets: Bet[] = [];
	let isLoading: boolean;

	$: dontHaveABet = bets.length === 0;

	userStore.subscribe((user) => (currentUser = user));

	async function sendBets() {
		isLoading = true;
		try {
			await saveBets(currentUser.uid, bets);
			toasts.success('Aposta feita com sucesso!');
		} catch (error: any) {
			toasts.error(error.message[0]);
		}
		isLoading = false;
		bets = [];
	}

	function onScoresFilled(bet: CustomEvent<Partial<Bet>>) {
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
