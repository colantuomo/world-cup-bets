import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getRemainingMatches } from '../services';
import type { CustomLocals, PageLoadData, RemainingMatch } from '../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export function load({
	locals,
	url
}: CustomServerLoadEvent): PageLoadData<Promise<RemainingMatch[]>> {
	if (!locals.userId) {
		throw redirect(302, '/login');
	}
	const response = getRemainingMatches(locals.userId);
	return {
		locals,
		response,
		url: url.pathname
	};
}
