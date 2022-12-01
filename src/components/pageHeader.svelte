<script lang="ts">
	import logo from '$lib/images/logo.png';
	import type { Auth } from 'firebase/auth';
	import { initializeFirebase } from '../lib/firebase';

	import Button from './button.svelte';

	export let userName: string;
	export let currentPoints: number;
	export let currentRoute: string | undefined = '';

	let loading: boolean;
	let loadingLink: boolean;
	const auth: Auth = initializeFirebase().auth;

	$: boucingFX = loadingLink ? 'animate-bounce' : '';

	function logOut() {
		auth?.signOut();
	}

	function handleLinkClick() {
		loadingLink = true;
	}

	function buttonColorByRoute(btnRoute: string) {
		return btnRoute === currentRoute ? 'bg-red-500 text-white' : 'bg-red-200';
	}
</script>

<div class="flex flex-col items-center py-4">
	<img class="w-32 mb-4" alt="Main logo" src={logo} />
	<h2 class="text-lg text-center font-semibold text-gray-500">
		{userName}
	</h2>
	<h3 class="text-md text-center text-gray-500">Meus pontos atuais: {currentPoints}</h3>
</div>
<div class="flex justify-between md:justify-center md:gap-8 py-4">
	<div class="flex gap-2">
		<Button
			{loading}
			text="Ranking"
			type="Secondary"
			on:click={() => {
				loading = true;
				window.location.href = '/ranking';
			}}
		/>
	</div>
	<Button loading={false} text="Logout" type="Secondary" on:click={logOut} />
</div>
<div class="flex gap-2 text-sm my-4 font-semibold">
	<a
		class={`px-4 py-2 rounded-full hover:shadow-gray-400 hover:shadow-inner ${boucingFX} ${buttonColorByRoute(
			'/'
		)}`}
		href="/"
		on:click={handleLinkClick}>Jogos hoje</a
	>
	<a
		class={`px-4 py-2 rounded-full hover:shadow-gray-400 hover:shadow-inner ${boucingFX} ${buttonColorByRoute(
			'/group-phase'
		)}`}
		href="/group-phase"
		on:click={handleLinkClick}>Fase de grupo</a
	>
</div>
