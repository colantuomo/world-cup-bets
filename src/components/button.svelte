<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Moon } from 'svelte-loading-spinners';
	import type { ButtonTypes } from './interfaces';

	const dispatch = createEventDispatcher();
	export let loading: boolean;
	export let text: string;
	export let type: keyof typeof ButtonTypes;

	function chooseColorPalletByType() {
		switch (type) {
			case 'Secondary':
				return 'text-black disabled:bg-gray-300 bg-gray-100';
			default:
				return 'text-white disabled:bg-gray-300 bg-blue-500';
		}
	}

	function onClick() {
		dispatch('click', {});
	}
</script>

<button
	disabled={loading}
	class={`flex justify-center p-2 rounded-lg font-bold w-40 md:w-52 ${chooseColorPalletByType()}`}
	on:click={onClick}
>
	{#if loading}
		<Moon size={24} color="black" />
	{:else}
		{text}
	{/if}
</button>
