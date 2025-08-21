import axios, { isAxiosError } from 'axios';
import type { ActionFunctionArgs } from 'react-router';
import type { User } from '../../types';
import { authProvider } from '../auth';
import { redirect } from 'react-router';

export async function loginAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');

	if (!email) {
		return { errors: { email: ['Email is required'] } };
	}

	if (!password) {
		return { errors: { password: ['Password is required'] } };
	}

	try {
		const response = await axios.post<{
			data: { user: User };
		}>('/api/auth/login', {
			email,
			password,
		});

		localStorage.setItem('user', JSON.stringify(response.data.data.user));
		authProvider.user = response.data.data.user;
		authProvider.isAuthenticated = true;

		return redirect('/dashboard');
	} catch (error) {
		if (isAxiosError(error)) {
			return {
				error: error.response?.data.message,
				...(error.response?.status === 422 && {
					errors: error.response?.data.errors,
				}),
			};
		}
		return { error: 'Failed to login' };
	}
}
