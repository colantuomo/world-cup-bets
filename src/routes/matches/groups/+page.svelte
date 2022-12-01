<script lang="ts">
	import GroupLabel from '../../../components/groupLabel.svelte';
	import { initializeFirebase } from '../../../lib/firebase';
	import { Groups, type GroupIndex, type MatchesData, type PageLoadData } from '../../../types';
	import { userStore } from '../../../stores';
	import { onMount } from 'svelte';
	import type { Auth } from 'firebase/auth';

	const auth: Auth = initializeFirebase().auth;

	export let data: PageLoadData<MatchesData>;
	userStore.set({ userId: data.locals.userId, userName: data.locals.userName });

	function getNameByGroupIndex(index: string) {
		return Groups[index as GroupIndex].toString();
	}

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user === null) {
				window.location.href = '/login';
				return;
			}
		});
	});
</script>

{#if data !== null}
	<div class="flex flex-col gap-5 p-4 md:p-0">
		{#if data.response && Object.values(data.response).length > 0}
			{#each Object.values(data.response) as group, i}
				<GroupLabel name={getNameByGroupIndex(Object.keys(data.response)[i])} matches={group} />
			{/each}
		{/if}
	</div>
{/if}
