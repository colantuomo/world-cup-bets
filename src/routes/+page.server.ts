import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, PageData } from './$types';
import { getMatchesWithBets } from '../services';

// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageServerLoad = async ({ locals }: PageData) => {
	if (!locals?.userId) {
		throw redirect(302, '/login');
	}
	const matches = await getMatchesWithBets();
	return {
		matches
	};
};
