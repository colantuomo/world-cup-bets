<script>
	import { initializeFirebase } from '$lib/firebase';
	import logo from '$lib/images/catar-logo.png';
	import { createUser, getUser } from '../../services';
	const { signInWithPopup, auth, googleProvider } = initializeFirebase();

	function login() {
		signInWithPopup(auth, googleProvider).then(async ({ user }) => {
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
		});
	}
</script>

<div class="container mx-auto px-6 md:px-60 flex flex-col items-center">
	<img class="w-96" alt="The project logo" src={logo} />
	<button class="bg-blue-500 text-white p-2 rounded-lg font-bold w-52" on:click={login}
		>Login with google</button
	>
</div>
