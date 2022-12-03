import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getTeamMatches } from '../../../../services';
import type { CustomLocals, PageLoadData, RemainingMatch } from '../../../../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export function load({
	locals,
	params,
	url
}: CustomServerLoadEvent): PageLoadData<Promise<RemainingMatch[]>> {
	if (!locals.userId || !params?.id) {
		throw redirect(302, '/login');
	}
	const response = getTeamMatches(locals.userId, params?.id);
	return {
		locals,
		response,
		url: url.pathname
	};
}
