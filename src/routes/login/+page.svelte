<script lang="ts">
	import { initializeFirebase } from '$lib/firebase';
	import logo from '$lib/images/catar-logo.png';
	import Button from '../../components/button.svelte';
	import { createUser, getUser } from '../../services';
	const { signInWithPopup, auth, googleProvider } = initializeFirebase();
	let loading: boolean;

	function setCookies(id: string, name: string) {
		document.cookie = `userId=${id}`;
		document.cookie = `userName=${name}`;
	}

	function login() {
		loading = true;
		signInWithPopup(auth, googleProvider)
			.then(async ({ user }) => {
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
			})
			.finally(() => (loading = false));
	}
</script>

<div class="container mx-auto px-6 md:px-60 flex flex-col items-center">
	<img class="w-96 h-96" alt="The project logo" src={logo} />
	<Button on:click={login} {loading} text="Login with google" type="Primary" />
</div>
