<script lang="ts">
	import logo from '$lib/images/logo.png';
	import type { Auth } from 'firebase/auth';
	import { initializeFirebase } from '../lib/firebase';

	import Button from './button.svelte';

	export let userName: string;
	export let currentPoints: number;

	let loading: boolean;
	let currentRoute: string = '/matches';

	const auth: Auth = initializeFirebase().auth;

	function logOut() {
		auth?.signOut();
	}

	// TODO: create a better way to handle link button state;
	// TODO: create a new store to handle loading state;
	function handleLinkClick(route: string) {
		currentRoute = route;
	}

	$: btnColor = (btnRoute: string) =>
		btnRoute === currentRoute ? 'bg-red-500 text-white' : 'bg-red-200';
</script>

<div class="flex flex-col items-center py-4">
	<img class="w-32 mb-4" alt="Main logo" src={logo} />
	<h2 class="text-lg text-center font-semibold text-gray-500">
		{userName}
	</h2>
	<h3 class="text-md text-center text-gray-500">Meus pontos atuais: {currentPoints}</h3>
</div>
<div class="flex justify-between md:justify-center md:gap-8 py-4 px-4 md:px-0">
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
<div class="flex gap-2 text-sm my-4 font-semibold px-4 md:p-0">
	<a
		class={`px-4 py-2 rounded-full hover:shadow-gray-400 hover:shadow-inner $ ${btnColor(
			'/matches'
		)}`}
		href="/matches"
		on:click={() => handleLinkClick('/matches')}>Jogos hoje</a
	>
	<a
		class={`px-4 py-2 rounded-full hover:shadow-gray-400 hover:shadow-inner $ ${btnColor(
			'/matches/groups'
		)}`}
		href="/matches/groups"
		on:click={() => handleLinkClick('/matches/groups')}>Fase de grupo</a
	>
</div>
