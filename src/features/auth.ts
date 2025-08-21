import type { User } from '../types';

export const authProvider: {
	isAuthenticated: boolean;
	user: User | null;
} = {
	isAuthenticated: localStorage.getItem('user') !== null,
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user') as string)
		: null,
};
