<script lang="ts">
	import { format } from 'date-fns';
	import type { Match } from '../types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let match: Match;

	let teamAScore: number = match.betScoreA;
	let teamBScore: number = match.betScoreB;

	function whenTheScoresWasFilled() {
		if (!teamAScore || !teamBScore) return;
		dispatch('scoresFilled', {
			matchId: match.matchId,
			teamAScore,
			teamBScore
		});
	}

	function formatDate(date: Date) {
		const day = format(date, 'd');
		const month = format(date, 'M');
		const dayAndMonth = `${day}/${month}`;
		const hourAndMinutes = `${format(date, 'HH')}:${format(date, 'mm')}`;
		return { day: dayAndMonth, hour: hourAndMinutes };
	}
</script>

<div class="flex flex-col bg-gray-100 rounded-sm border-gray-200 border-solid border-2 w-80">
	<div class="flex flex-1 p-6 justify-between gap-5">
		<div class="flex-row text-center flex-1 justify-center items-center">
			<p class="text-xl font-bold">{formatDate(new Date(match.matchDate)).day}</p>
			<p class="text-lg">{formatDate(new Date(match.matchDate)).hour}</p>
		</div>
		<div class="border-l-2 border-gray-300" />
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
	<div class="border-b-2 border-gray-300 border-dotted w-full" />
	<div class="flex p-6 justify-between items-center">
		<div>
			<p class="font-bold">Sua aposta:</p>
			<p>Resultado Final:</p>
		</div>
		<div class="text-center">
			<input
				min="0"
				disabled={match.canEdit}
				maxlength="1"
				class="w-10 font-bold text-center bg-transparent"
				placeholder="-"
				type="number"
				bind:value={teamAScore}
				on:change={whenTheScoresWasFilled}
			/>
			<p>-</p>
		</div>
		<div class="items-center font-bold">X</div>
		<div class="text-center">
			<input
				min="0"
				disabled={match.canEdit}
				maxlength="1"
				class="w-10 font-bold text-center bg-transparent"
				placeholder="-"
				type="number"
				bind:value={teamBScore}
				on:change={whenTheScoresWasFilled}
			/>
			<p>-</p>
		</div>
	</div>
</div>
