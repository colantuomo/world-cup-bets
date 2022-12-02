import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAyG3hJXDMRjVObLFwIQLv6fEFstTCKo_0',
	authDomain: 'world-cup-betss.firebaseapp.com',
	projectId: 'world-cup-betss',
	storageBucket: 'world-cup-betss.appspot.com',
	messagingSenderId: '225292266399',
	appId: '1:225292266399:web:711721c257a204cfcdabaa'
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account'
});

export function initializeFirebase() {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth();
	return {
		app,
		signInWithPopup,
		googleProvider,
		auth
	};
}
