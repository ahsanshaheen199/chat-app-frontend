import { authProvider } from '../../auth';
import { redirect } from 'react-router';

export async function dashboardLoader() {
	if (!authProvider.isAuthenticated) {
		return redirect('/login');
	}
	if (authProvider.user?.isVerified === false) {
		return redirect('/verify-email');
	}
	return null;
}
