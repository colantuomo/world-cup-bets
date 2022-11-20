<script lang="ts">
	import { format } from 'date-fns';
	import type { Match } from '../types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let match: Match;
	let teamAScore: number = match.betScoreA;
	let teamBScore: number = match.betScoreB;

	function whenTheScoresWasFilled() {
		if (teamAScore === null || teamBScore === null) return;
		let betIdParam = {};
		if (match.betId !== null) {
			betIdParam = { id: match.betId };
		}
		dispatch('scoresFilled', {
			matchId: match.matchId,
			scoreA: teamAScore,
			scoreB: teamBScore,
			...betIdParam
		});
	}

	function getCardColorsByPoints() {
		if (match.matchScoreA === null && match.matchScoreB === null)
			return { bg: 'bg-gray-100', border: 'border-gray-200' };
		switch (match.totalPoints) {
			case 0:
				return { bg: 'bg-red-100', border: 'border-red-200' };
			case 5:
				return { bg: 'bg-green-100', border: 'border-green-200' };
			default:
				return { bg: 'bg-yellow-100', border: 'border-yellow-200' };
		}
	}

	const { bg, border } = getCardColorsByPoints();

	function formatDate(date: Date) {
		const day = format(date, 'd');
		const month = format(date, 'M');
		const dayAndMonth = `${day}/${month}`;
		const hourAndMinutes = `${format(date, 'HH')}:${format(date, 'mm')}`;
		return { day: dayAndMonth, hour: hourAndMinutes };
	}
</script>

<div class={`flex flex-col rounded-sm border-solid border-2 w-80 hover:shadow-lg ${bg} ${border}`}>
	<div class="flex flex-1 p-6 justify-between gap-5">
		<div class="flex-row text-center flex-1 justify-center items-center">
			<p class="text-xl font-bold">{formatDate(new Date(match.matchDate)).day}</p>
			<p class="text-lg">{formatDate(new Date(match.matchDate)).hour}</p>
		</div>
		<div class={`border-l-2 border-gray-300 ${border}`} />
		<div class="flex justify-center text-center gap-2 flex-1">
			<div>
				<img class="w-16" src={match.teamAvatarA} alt="team_a_flag" />
				<p class="text-lg">{match.teamTagA}</p>
			</div>
			<p class="font-bold">X</p>
			<div>
				<img class="w-16" src={match.teamAvatarB} alt="team_b_flag" />
				<p class="text-lg">{match.teamTagB}</p>
			</div>
		</div>
	</div>
	<div class={`border-b-2 border-dotted w-full ${border}`} />
	<div class="flex p-6 justify-between items-center">
		<div>
			<p class="font-bold">Sua aposta:</p>
			<p>Resultado Final:</p>
		</div>
		<div class="text-center">
			{#if !match.canEdit}
				<p class="w-10 font-bold">{teamAScore}</p>
			{:else}
				<input
					min="0"
					disabled={!match.canEdit}
					maxlength="1"
					class="w-10 font-bold text-center md:pl-4 bg-transparent"
					placeholder="-"
					type="number"
					bind:value={teamAScore}
					on:change={whenTheScoresWasFilled}
				/>
			{/if}
			<p class="w-10">{match.matchScoreA ?? '-'}</p>
		</div>
		<div class="items-center font-bold">X</div>
		<div class="text-center">
			{#if !match.canEdit}
				<p class="w-10 font-bold">{teamBScore}</p>
			{:else}
				<input
					min="0"
					disabled={!match.canEdit}
					maxlength="1"
					class="w-10 font-bold text-center md:pl-4 bg-transparent"
					placeholder="-"
					type="number"
					bind:value={teamBScore}
					on:change={whenTheScoresWasFilled}
				/>
			{/if}
			<p class="w-10">{match.matchScoreB ?? '-'}</p>
		</div>
	</div>
</div>
