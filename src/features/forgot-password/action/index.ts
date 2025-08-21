import { isAxiosError } from 'axios';
import type { ActionFunctionArgs } from 'react-router';
import appAxios from '../../../lib/axios';

export async function forgotPasswordAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get('email');

	if (!email) {
		return {
			errors: { email: ['Email is required'] },
		};
	}

	try {
		await appAxios.post('/api/auth/forgot-password', {
			email,
		});

		return {
			success:
				"If an account with that email exists, we've sent you a password reset link.",
		};
	} catch (error) {
		if (isAxiosError(error)) {
			return {
				error:
					error.response?.data.message ||
					'Something went wrong. Please try again.',
				...(error.response?.status === 422 && {
					errors: error.response?.data.errors,
				}),
			};
		}
		return { error: 'Failed to send reset email. Please try again.' };
	}
}
