import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { VerifyEmailPage } from './pages/verify-email';
import { signupAction } from './features/signup/action';
import { signupLoader } from './features/signup/loader';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <div>Hello World</div>,
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
	]);

	return <RouterProvider router={router} />;
}

export default App;
