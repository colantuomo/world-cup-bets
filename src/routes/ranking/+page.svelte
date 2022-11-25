<script lang="ts">
	import { initializeFirebase } from '../../lib/firebase';
	import type { PageLoadData, RankingUser } from '../../types';
	import logo from '$lib/images/logo.png';
	import Button from '../../components/button.svelte';
	import RankingItem from '../../components/rankingItem.svelte';

	export let data: PageLoadData<RankingUser[] | null>;
	let loading: boolean;
	let promise: Promise<{ data: RankingUser[] | null; error: any }>;
	const { auth } = initializeFirebase();
	function logOut() {
		auth.signOut();
	}
	function navigateToOthersUsersBets(event: CustomEvent<{ userId: number; name: string }>) {
		sessionStorage.setItem('rankingUserName', event.detail.name);
		window.location.href = `/matches/${event.detail.userId}`;
	}
</script>

<svelte:head>
	<title>World Cup Bets - Ranking</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

<div class="container mx-auto px-2 flex justify-center">
	{#if data !== null && data.response !== null}
		<div class="flex flex-col items-center py-4 md:w-1/2">
			<img class="w-32 mb-4" alt="Main logo" src={logo} />
			<div class="flex justify-between md:justify-center py-4 gap-6 w-full">
				<div class="flex gap-2">
					<Button
						{loading}
						text="Minhas apostas"
						type="Secondary"
						on:click={() => {
							loading = true;
							window.location.href = '/';
						}}
					/>
				</div>
				<Button loading={false} text="Logout" type="Secondary" on:click={logOut} />
			</div>
			<div class="flex flex-col w-full gap-3">
				{#each data.response as rankingUser, i}
					<RankingItem
						userId={rankingUser.userId}
						name={rankingUser.userName}
						points={rankingUser.total}
						position={i + 1}
						isMine={rankingUser.isMine}
						on:click={navigateToOthersUsersBets}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
