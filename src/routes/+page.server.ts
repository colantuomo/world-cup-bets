import type { ServerLoadEvent } from '@sveltejs/kit';
import { getMatchesWithBets } from '../services';
import type { CustomLocals, MatchesData, PageLoadData } from '../types';

export const prerender = true;
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export function load({ locals }: CustomServerLoadEvent): PageLoadData<Promise<MatchesData>> {
	const response = getMatchesWithBets(locals.userId);
	return {
		locals,
		response
	};
}