import type { Match } from '../types';
import { env } from '$env/dynamic/private';

export async function getMatchesWithBets() {
	const request = fetch(`${env.API_URL}/api/v1/matches`);
	const json = (await request).json();
	const matches = (await json) as Match[];
	return matches;
}
