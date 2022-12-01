import type { ServerLoadEvent } from '@sveltejs/kit';
import type { CustomLocals, MatchesData, PageLoadData } from '../../../types';
interface CustomServerLoadEvent extends ServerLoadEvent {
	locals: CustomLocals;
}

export async function load({
	parent
}: CustomServerLoadEvent): Promise<PageLoadData<Promise<MatchesData>>> {
	// o parent vai trazer os mesmos dados que estao no "layout.server" pai
	const { locals, response, url } = await parent();
	return {
		locals,
		response,
		url
	};
}
