import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

// import { getMatchesWithBets } from '../services';
import type { Match } from '../types';

// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
	const request = fetch(`${env.API_URL}/api/v1/matches`);
	const json = (await request).json();
	const groups = (await json) as Match[];
	return {
		groups
	};
};
