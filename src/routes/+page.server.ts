import type { PageServerLoad } from './$types';
import { getMatchesWithBets } from '../services';

// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageServerLoad = async () => {
	const groups = await getMatchesWithBets();
	return {
		groups
	};
};
