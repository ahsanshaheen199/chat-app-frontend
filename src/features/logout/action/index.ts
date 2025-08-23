import { redirect } from 'react-router';
import { authProvider } from '../../auth';
import appAxios from '../../../lib/axios';

export async function logoutAction() {
	try {
		await appAxios.post('/api/auth/logout');
		localStorage.removeItem('user');
		authProvider.isAuthenticated = false;
		authProvider.user = null;
		return redirect('/login');
	} catch {
		return { error: 'Failed to logout' };
	}
}
