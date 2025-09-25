import { Link } from 'react-router';
import { FormInput } from '../components/form/input';
import { FormLabel } from '../components/form/label';
import { Button } from '../components/form/button';
import { useState } from 'react';
import { socket } from '../lib/socket';
import appAxios from '../lib/axios';
import { authProvider } from '../features/auth';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

export function LoginPage() {
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const [showError, setShowError] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setError(null);
		setErrors({});
		setShowError(false);
		setIsLoading(true);
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			setErrors({ email: ['Email is required'] });
			setShowError(true);
			setIsLoading(false);
			return;
		}

		if (!password) {
			setErrors({ password: ['Password is required'] });
			setShowError(true);
			setIsLoading(false);
			return;
		}

		try {
			const response = await appAxios.post('/api/auth/login', {
				email,
				password,
			});

			authProvider.user = response.data.data.user;
			authProvider.isAuthenticated = true;
			localStorage.setItem(
				'user',
				JSON.stringify(response.data.data.user)
			);
			socket.auth = {
				userId: response.data.data.user.id,
			};
			socket.connect();

			navigate('/dashboard');
		} catch (error) {
			if (isAxiosError(error)) {
				setError(error.response?.data.message || 'Failed to login');
			} else {
				setError('Failed to login. Please try again.');
			}
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						{showError && error && (
							<div className="mb-5 flex w-full justify-between rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5">
								<div className="flex flex-1 flex-col">
									<p className="text-sm font-semibold text-[#9F2225]">
										{error}
									</p>
								</div>
							</div>
						)}
						<h1 className="text-heading-primary text-3xl font-bold">
							Log in to your account
						</h1>
						<p className="mt-2.5 text-sm">
							Enter your email and password to log in to your
							account.
						</p>
						<form onSubmit={handleSubmit} className="mt-8">
							<div className="mb-4 flex flex-col gap-y-2">
								<FormLabel
									htmlFor="email"
									className="inline-block"
								>
									Email
								</FormLabel>
								<FormInput
									id="email"
									placeholder="name@example.com"
									type="email"
									name="email"
									isError={!!errors.email}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.email;
										setErrors(newErrors);
									}}
								/>
								{errors.email && (
									<p className="text-sm text-red-500">
										{errors.email}
									</p>
								)}
							</div>
							<div className="mb-5 flex flex-col gap-y-2">
								<FormLabel
									htmlFor="password"
									className="inline-flex justify-between"
								>
									Password
									<Link
										className="text-bg-primary hover:underline"
										to="/forgot-password"
									>
										Forgot password?
									</Link>
								</FormLabel>
								<FormInput
									id="password"
									placeholder="********"
									type="password"
									name="password"
									isError={!!errors.password}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.password;
										setErrors(newErrors);
									}}
								/>
								{errors.password && (
									<p className="text-sm text-red-500">
										{errors.password}
									</p>
								)}
							</div>
							<div>
								<Button
									isLoading={isLoading}
									className="w-full"
									disabled={isLoading}
									type="submit"
								>
									{isLoading ? 'Logging in...' : 'Log in'}
								</Button>
							</div>
							<div className="mt-4">
								<p className="text-center text-sm">
									Don't have an account?{' '}
									<Link
										className="text-bg-primary font-medium hover:underline"
										to="/signup"
									>
										Sign up
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="relative hidden lg:block">
				<img
					src="/images/login.jpg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
