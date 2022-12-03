<script lang="ts">
	import { SvelteToast, type SvelteToastOptions } from '@zerodevx/svelte-toast';
	import { navigating } from '$app/stores';
	import './styles.css';

	const options: SvelteToastOptions = {};
	export let data: { url: URL };
	let loading: boolean;
	function isDev() {
		return data?.url.host !== 'apostas-copa-do-mundo.vercel.app';
	}

	navigating.subscribe((state) => {
		if (state !== null) {
			loading = true;
			return;
		}
		loading = false;
	});
</script>

<SvelteToast {options} />
<div class="app">
	{#if loading}
		<div class="h-4 w-full bg-red-400 animate-ping absolute top-0" />
	{/if}
	<main>
		{#if isDev()}
			<div class="bg-red-400 text-center text-white">Ambiente de desenvolvimento</div>
		{/if}
		<slot />
	</main>
</div>

<style>
</style>
