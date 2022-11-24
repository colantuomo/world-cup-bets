<script lang="ts">
	import { initializeFirebase } from '$lib/firebase';
	import logo from '$lib/images/catar-logo.png';
	import Button from '../../components/button.svelte';
	import { createUser, getUser } from '../../services';
	const { signInWithPopup, auth, googleProvider } = initializeFirebase();
	let loading: boolean;

	function login() {
		loading = true;
		signInWithPopup(auth, googleProvider)
			.then(async ({ user }) => {
				document.cookie = `userId=${user.uid}`;
				const { error } = await getUser(user.uid);
				if (error) {
					const { error } = await createUser({
						googleUserId: user.uid,
						name: user.displayName ?? '',
						avatar: null
					});
					if (error === null) window.location.href = '/';
					return;
				}
				window.location.href = '/';
			})
			.finally(() => (loading = false));
	}
</script>

<div class="container mx-auto px-6 md:px-60 flex flex-col items-center">
	<img class="w-96" alt="The project logo" src={logo} />
	<Button on:click={login} {loading} text="Login with google" type="Primary" />
</div>
