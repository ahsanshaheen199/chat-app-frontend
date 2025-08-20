import { redirect, type ActionFunctionArgs } from "react-router";
import appAxios from "../../../lib/axios";
import { isAxiosError } from "axios";
import { authProvider } from "../../auth";
import type { User } from "../../../types";

export async function signupAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	const firstName = formData.get('firstName');
	const lastName = formData.get('lastName');
	const email = formData.get('email');
	const password = formData.get('password');
	const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match', errors: { confirmPassword: ['Passwords do not match'] } };
    }

    try {
        const response = await appAxios.post<{ data: { token: string, user: User } }>('/auth/register', {
            firstName,
            lastName,
            email,
            password,
        });

        localStorage.setItem('token', JSON.stringify(response.data.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        authProvider.user = response.data.data.user;
        authProvider.isAuthenticated = true;

        return redirect('/verify-email');
    } catch (error) {
        if ( isAxiosError(error) ) {
            return { error: error.response?.data.message, ...(error.response?.status === 422 && { errors: error.response?.data.errors }) };
        }
        return { error: 'Failed to sign up' };
    }

	
}