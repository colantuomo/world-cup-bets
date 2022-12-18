import { redirect } from '@sveltejs/kit';
import type { PageLoadData } from '../types';

export function load(): PageLoadData<void> {
	throw redirect(302, '/ranking');
}
