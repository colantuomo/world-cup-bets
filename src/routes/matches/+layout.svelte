<script lang="ts">
	import PageHeader from '../../components/pageHeader.svelte';
	import type { MatchesData, PageLoadData } from '../../types';
	import { navigating } from '$app/stores';

	export let data: PageLoadData<MatchesData>;

	function getMyCurrentTotalPoints(matches: MatchesData) {
		if (!matches) return;
		const groups = Object.values(matches);
		let myPoints = 0;
		groups.forEach((group) => {
			group.forEach(({ totalPoints }) => (myPoints += totalPoints));
		});
		return myPoints;
	}

    //TODO: use this store to create a visual feedback
	navigating.subscribe((state) => {
		console.log('navigating: ', state);
	});
</script>

<svelte:head>
	<title>World Cup Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

<section class="container mx-auto px-4 md:w-4/5">
	<PageHeader
		userName={data.locals.userName}
		currentPoints={getMyCurrentTotalPoints(data.response) ?? 0}
	/>
	<slot />
</section>
