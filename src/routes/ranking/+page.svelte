<script lang="ts">
	import { getRanking } from '../../services';
	import { onMount } from 'svelte';
	import { initializeFirebase } from '../../lib/firebase';
	import type { RankingUser } from '../../types';
	import logo from '$lib/images/logo.png';
	import Button from '../../components/button.svelte';
	import RankingItem from '../../components/rankingItem.svelte';
	import { Moon } from 'svelte-loading-spinners';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

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
	onMount(() => {
		sessionStorage.removeItem('rankingUserName');
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				window.location.href = '/login';
				return;
			}
			promise = getRanking(user.uid);
		});
	});
</script>

<svelte:head>
	<title>World Cup Bets - Ranking</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if promise === undefined}
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div transition:fade={{ delay: 1500, duration: 1500, easing: quintOut }}>
			<Moon />
		</div>
	</div>
{:else}
	<div class="container mx-auto px-2 flex justify-center">
		{#await promise then prm}
			{#if prm !== undefined && prm.data !== null}
				<div
					transition:fade={{ delay: 500, duration: 1500, easing: quintOut }}
					class="flex flex-col items-center py-4 md:w-1/2"
				>
					<img class="w-32 h-32 mb-4" alt="Main logo" src={logo} />
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
						{#each prm.data as rankingUser, i}
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
		{/await}
	</div>
{/if}
