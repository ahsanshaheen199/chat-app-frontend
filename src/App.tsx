import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { VerifyEmailPage } from './pages/verify-email';
import { ForgotPasswordPage } from './pages/forgot-password';
import { ResetPasswordPage } from './pages/reset-password';
import { signupAction } from './features/signup/action';
import { signupLoader } from './features/signup/loader';
import { dashboardLoader } from './features/dashboard/loader';
import { DashboardPage } from './pages/dashboard';
import { logoutAction } from './features/logout/action';
import { loginAction } from './features/login/action';
import { forgotPasswordAction } from './features/forgot-password/action';
import { resetPasswordAction } from './features/reset-password/action';
import { MessagesPage } from './pages/messages';
import { BlankMessage } from './features/messages/components/blank-message';
import { messagesLoader } from './features/messages/loader';
import { ConversationPage } from './pages/conversation';
import { conversationLoader } from './features/conversation/loader';
import { AuthContextProvider } from './contexts/auth-context';

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
			action: loginAction,
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
			path: '/forgot-password',
			element: <ForgotPasswordPage />,
			action: forgotPasswordAction,
		},
		{
			path: '/reset-password/:token',
			element: <ResetPasswordPage />,
			action: resetPasswordAction,
		},
		{
			path: '/logout',
			action: logoutAction,
		},
		{
			path: '/messages',
			element: <MessagesPage />,
			loader: messagesLoader,
			children: [
				{
					element: <BlankMessage />,
					index: true,
				},
				{
					path: ':conversationId',
					element: <ConversationPage />,
					loader: conversationLoader,
				},
			],
		},
	]);

	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
