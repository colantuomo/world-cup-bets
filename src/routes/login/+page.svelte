<script>
	import { initializeFirebase } from '$lib/firebase';
	const { signInWithPopup, auth, googleProvider } = initializeFirebase();

	function login() {
		signInWithPopup(auth, googleProvider).then((user) => {
			document.cookie = `userId=${user.user.uid}`;
			window.location.href = '/';
		});
	}
</script>

<h1>login screen</h1>
<button on:click={login}>Login with google</button>
