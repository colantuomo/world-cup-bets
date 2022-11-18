import type { Handle } from '@sveltejs/kit';
import type { CustomLocals } from './types';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const userId = cookies.get('userId');
	// before endpoint or page is called
	if (userId) {
		(event.locals as CustomLocals).userId = userId;
	}
	if (!(event.locals as CustomLocals).userId) cookies.delete('userId');
	const response = await resolve(event);

	// after endpoint or page is called

	return response;
};
