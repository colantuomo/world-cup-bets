import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getPlayerMatchesWithBets } from '../../../services';
import type { CustomLocals, MatchesData, PageLoadData } from '../../../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export async function load({
	locals,
	params,
	url
}: CustomServerLoadEvent): PageLoadData<Promise<MatchesData>> {
	if (!locals.userId || !params?.id) {
		throw redirect(302, '/login');
	}
	const response = await getPlayerMatchesWithBets(locals.userId, params?.id);
	console.log(response);
	return {
		locals,
		response,
		url: url.pathname
	};
}
