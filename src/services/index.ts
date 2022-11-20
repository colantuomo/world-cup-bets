import type { Bet, Match, MatchesData } from '../types';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH';
const API_URL = 'https://world-cup-bets-service-production.up.railway.app';

async function request<T = unknown>(url: string, method: Method, userId: string, body?: unknown) {
	let requestParams: RequestInit = {};
	switch (method) {
		case 'GET':
			requestParams = {
				method
			};
			break;
		case 'POST':
			requestParams = {
				method,
				body: JSON.stringify(body)
			};
			break;
		case 'PUT':
			requestParams = {
				method
			};
			break;
		case 'PATCH':
			requestParams = {
				method,
				body: JSON.stringify(body)
			};
			break;
	}
	const r = fetch(url, {
		...requestParams,
		headers: {
			'Content-Type': 'application/json',
			'user-id': userId
		}
	});
	try {
		const json = (await r).json();
		const data = (await json) as T;
		return { data, error: null };
	} catch (error) {
		return { data: null, error };
	}
}

export async function getMatchesWithBets(userId: string) {
	const { data, error } = await request<MatchesData>(`${API_URL}/api/v1/matches`, 'GET', userId);
	if (error) {
		throw error;
	}
	return data;
}

export async function saveBets(userId: string, bets: Bet[]) {
	const { data, error } = await request<Match[]>(`${API_URL}/api/v1/bets`, 'POST', userId, bets);
	if (error) {
		throw error;
	}
	return data;
}
