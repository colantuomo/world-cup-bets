<script lang="ts">
	import { SvelteToast, type SvelteToastOptions } from '@zerodevx/svelte-toast';
	import './styles.css';
	const options: SvelteToastOptions = {};
	export let data: { url: URL };

	function isDev() {
		return data?.url.host !== 'apostas-copa-do-mundo.vercel.app';
	}
</script>

<SvelteToast {options} />
<div class="app">
	<main>
		{#if isDev()}
			<div class="bg-red-400 text-center text-white">Development Environment</div>
		{/if}

		<slot />
	</main>
</div>

<style>
</style>
