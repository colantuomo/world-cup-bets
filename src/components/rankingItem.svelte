<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let userId: number;
	export let name: string;
	export let points: number;
	export let position: number;
	export let isMine: boolean = false;

	const dispatch = createEventDispatcher();
	function onClick() {
		if (isMine) return;
		dispatch('click', {
			userId,
			name
		});
	}

	function getColorsByPosition() {
		switch (position) {
			case 1:
				return 'bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 border-solid border-yellow-300 border-4';
			case 2:
				return 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400';
			case 3:
				return 'bg-gradient-to-r from-orange-200 via-orange-400 to-orange-500';

			default:
				return 'bg-gray-100';
		}
	}
</script>

<button on:click={onClick} class={`p-4 flex items-center gap-6 ${getColorsByPosition()}`}>
	<div
		class={`bg-gray-600 rounded-full w-10 h-10 p-5 text-white font-bold flex justify-center items-center ${
			isMine && 'border-2 border-red-500'
		}`}
	>
		{position}
	</div>
	<div class="flex items-center justify-between w-full">
		<p class="text-md font-semibold">{name}</p>
		<p class="text-3xl">{points}</p>
	</div>
</button>
