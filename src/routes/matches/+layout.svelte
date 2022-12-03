<script lang="ts">
	import PageHeader from '../../components/pageHeader.svelte';
	import type { MatchesData, PageLoadData } from '../../types';

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
</script>

<svelte:head>
	<title>World Cup Bets</title>
	<meta name="description" content="World Cup Bets App" />
</svelte:head>

<section class="container mx-auto">
	<PageHeader
		userName={data.locals.userName}
		currentPoints={getMyCurrentTotalPoints(data.response) ?? 0}
	/>
	<slot />
</section>
