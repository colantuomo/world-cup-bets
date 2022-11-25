import { writable, type Writable } from 'svelte/store';

export interface LocalsUser {
	userId: string;
	userName: string;
}

export const userStore: Writable<LocalsUser> = writable<LocalsUser>();
