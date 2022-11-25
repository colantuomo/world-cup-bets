import type { PageServerLoad } from './$types';

export async function load({ params }: PageServerLoad) {
	console.log('main page params: ', params);
	return params;
}
