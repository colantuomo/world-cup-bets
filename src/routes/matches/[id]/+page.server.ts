import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getPlayerMatchesWithBets } from '../../../services';
import type { CustomLocals, MatchesData, PageLoadData } from '../../../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export function load({
	locals,
	params
}: CustomServerLoadEvent): PageLoadData<Promise<MatchesData>> {
	if (!locals.userId || !params?.id) {
		throw redirect(302, '/login');
	}
	const response = getPlayerMatchesWithBets(locals.userId, params?.id);
	return {
		locals,
		response
	};
}
