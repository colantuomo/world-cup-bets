<script lang="ts">
	import GroupLabel from '../../components/groupLabel.svelte';
	import { initializeFirebase } from '../../lib/firebase';
	import { userStore } from '../../stores';
	import { onMount } from 'svelte';
	import type { Auth } from 'firebase/auth';
	import type { PageLoadData, RemainingMatch } from '../../types';

	const auth: Auth = initializeFirebase().auth;

	export let data: PageLoadData<RemainingMatch[]>;
	userStore.set({ userId: data.locals.userId, userName: data.locals.userName });

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				window.location.href = '/login';
				return;
			}
		});
	});
</script>

<svelte:head>
	<title>World Cup Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

{#if data !== null}
	<div class="flex flex-col gap-5 p-4 md:p-0">
		{#if data.response && data.response.length > 0}
			{#each data.response as group}
				<GroupLabel name={group.name} matches={group.matches} />
			{/each}
		{/if}
	</div>
{/if}
