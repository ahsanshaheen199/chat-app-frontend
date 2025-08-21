import axios, { isAxiosError } from 'axios';
import type { ActionFunctionArgs } from 'react-router';
import type { User } from '../../../types';

export async function resetPasswordAction({
	request,
	params,
}: ActionFunctionArgs) {
	const formData = await request.formData();
	const token = params.token;
	const password = formData.get('password');
	const passwordConfirmation = formData.get('password_confirmation');

	if (!token) {
		return { error: 'Reset token is required' };
	}

	if (!password) {
		return { errors: { password: ['Password is required'] } };
	}

	if (!passwordConfirmation) {
		return {
			errors: {
				password_confirmation: ['Password confirmation is required'],
			},
		};
	}

	if (password !== passwordConfirmation) {
		return {
			errors: { password_confirmation: ['Passwords do not match'] },
		};
	}

	try {
		await axios.post<{
			data: { user: User };
		}>(`/api/auth/reset-password/${token}`, {
			password,
		});

		return {
			success:
				'Password reset successful. You can now login with your new password.',
		};
	} catch (error) {
		if (isAxiosError(error)) {
			return {
				error:
					error.response?.data.message || 'Failed to reset password',
				...(error.response?.status === 422 && {
					errors: error.response?.data.errors,
				}),
			};
		}
		return { error: 'Failed to reset password. Please try again.' };
	}
}
