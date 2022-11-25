import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getMatchesWithBets } from '../services';
import type { CustomLocals, MatchesData, PageLoadData } from '../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export function load({ locals }: CustomServerLoadEvent): PageLoadData<Promise<MatchesData>> {
	if (!locals.userId) {
		throw redirect(302, '/login');
	}
	const response = getMatchesWithBets(locals.userId);
	return {
		locals,
		response
	};
}
