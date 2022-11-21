<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Moon } from 'svelte-loading-spinners';

	const dispatch = createEventDispatcher();
	export let loading: boolean;
	export let text: string;

	function onClick() {
		dispatch('onPress', {});
	}
</script>

<button
	disabled={loading}
	class="flex justify-center bg-blue-500 text-white p-2 rounded-lg font-bold w-52 disabled:bg-gray-300"
	on:click={onClick}
>
	{#if loading}
		<Moon size={24} color="black" />
	{:else}
		{text}
	{/if}
</button>
