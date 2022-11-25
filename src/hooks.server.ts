import type { Handle } from '@sveltejs/kit';
import type { CustomLocals } from './types';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const userId = cookies.get('userId');
	const userName = cookies.get('userName');
	// before endpoint or page is called
	if (userId && userName) {
		(event.locals as CustomLocals).userId = userId;
		(event.locals as CustomLocals).userName = userName;
	}
	if (!(event.locals as CustomLocals).userId) {
		cookies.delete('userId');
		cookies.delete('userName');
	}
	const response = await resolve(event);

	// after endpoint or page is called

	return response;
};
