<script lang="ts">
	import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte';
	import { initializeFirebase } from '$lib/firebase';
	import logo from '$lib/images/logo.png';
	import { createUser, getUser } from '../../services';
	const { signInWithPopup, auth, googleProvider } = initializeFirebase();
	let loading: boolean;

	function setCookies(id: string, name: string) {
		document.cookie = `userId=${id}`;
		document.cookie = `userName=${name}`;
	}

	function login() {
		loading = true;
		signInWithPopup(auth, googleProvider).then(async ({ user }) => {
			const userName = user.displayName ?? '';
			const { error } = await getUser(user.uid);
			if (error) {
				const { error } = await createUser({
					googleUserId: user.uid,
					name: userName,
					avatar: null
				});
				setCookies(user.uid, userName);
				if (error === null) window.location.href = '/';
				return;
			}
			setCookies(user.uid, userName);
			window.location.href = '/';
		});
	}
</script>

<svelte:head>
	<title>World Cup Bets - Login</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

<section class="h-screen flex justify-center flex-col items-center gap-11">
	<img class="w-72" alt="The project logo" src={logo} />
	<button
		on:click={login}
		class="bg-white flex gap-3 p-4 text-blue-500 font-semibold rounded-lg items-center border-blue-400 border-2"
		>Entrar com google <div class={`w-8 ${loading ? 'animate-spin' : ''}`}>
			<IoLogoGoogle />
		</div></button
	>
</section>
