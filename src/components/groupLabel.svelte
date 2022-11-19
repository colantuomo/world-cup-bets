<script lang="ts">
	import type { Match } from '../types';
	import Card from './card.svelte';

	export let name: string;
	export let matches: Match[];
</script>

<div class="flex flex-col gap-5 mb-10">
	<div class="bg-gray-700 text-white p-2 rounded-sm">{name}</div>
	<div class="flex gap-3 flex-wrap justify-center md:justify-start">
		{#each matches as match}
			<Card {match} />
		{/each}
	</div>
</div>
