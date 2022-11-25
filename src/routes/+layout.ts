// import type { PageServerLoad } from './$types';

export async function load({ url }: any) {
	console.log('main page params: ', url);
	return { url };
}
