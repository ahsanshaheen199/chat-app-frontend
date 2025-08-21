import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { VerifyEmailPage } from './pages/verify-email';
import { signupAction } from './features/signup/action';
import { signupLoader } from './features/signup/loader';
import { dashboardLoader } from './features/dashboard/loader';
import { DashboardPage } from './pages/dashboard';
import { logoutAction } from './features/logout/action';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navigate to="/dashboard" />,
		},
		{
			path: '/dashboard',
			element: <DashboardPage />,
			loader: dashboardLoader,
		},
		{
			path: '/login',
			element: <LoginPage />,
			loader: signupLoader,
		},
		{
			path: '/signup',
			element: <SignupPage />,
			action: signupAction,
			loader: signupLoader,
		},
		{
			path: '/verify-email',
			element: <VerifyEmailPage />,
			loader: signupLoader,
		},
		{
			path: '/logout',
			action: logoutAction,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
