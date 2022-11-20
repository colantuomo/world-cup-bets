<script lang="ts">
	import { SvelteToast, type SvelteToastOptions } from '@zerodevx/svelte-toast';
	import './styles.css';
	const options: SvelteToastOptions = {};
</script>

<SvelteToast {options} />
<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
</style>
