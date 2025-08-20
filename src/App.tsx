import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { VerifyEmailPage } from './pages/verify-email';
import { signupAction } from './features/signup/action';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <div>Hello World</div>,
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/signup',
			element: <SignupPage />,
			action: signupAction,
		},
		{
			path: '/verify-email',
			element: <VerifyEmailPage />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
