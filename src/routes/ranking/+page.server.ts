import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getRanking } from '../../services';

import type { CustomLocals, PageLoadData, RankingUser } from '../../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export async function load({
	locals
}: CustomServerLoadEvent): Promise<PageLoadData<RankingUser[] | null>> {
	if (!locals.userId) {
		throw redirect(302, '/login');
	}
	const { data, error } = await getRanking(locals.userId);
	return {
		locals,
		response: data,
		error
	};
}
