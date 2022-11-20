import type { User } from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';

export const userStore: Writable<User> = writable<User>();
