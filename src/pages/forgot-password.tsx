import { Form, Link, useActionData, useNavigation } from 'react-router';
import { FormInput } from '../components/form/input';
import { FormLabel } from '../components/form/label';
import { Button } from '../components/form/button';
import { useState } from 'react';
import { useEffect } from 'react';

export function ForgotPasswordPage() {
	const action = useActionData() as {
		error?: string;
		success?: string;
		errors?: Record<string, string[]>;
	};
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const [showError, setShowError] = useState(false);

	const navigation = useNavigation();
	const isLoading = navigation.state === 'submitting';

	useEffect(() => {
		let errorTimeout: NodeJS.Timeout;

		if (action?.error) {
			setShowError(true);
			errorTimeout = setTimeout(() => {
				setShowError(false);
			}, 5000);
		}

		if (action?.errors) {
			setErrors(action.errors);
		}

		return () => {
			clearTimeout(errorTimeout);
		};
	}, [action]);

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						{showError && action?.error && (
							<div className="mb-5 flex w-full justify-between rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5">
								<div className="flex flex-1 flex-col">
									<p className="text-sm font-semibold text-[#9F2225]">
										{action?.error}
									</p>
								</div>
							</div>
						)}
						{action?.success && (
							<div className="mb-5 flex w-full justify-between rounded-lg border border-[#1B5723]/10 bg-[rgba(229,255,229,1)] p-5">
								<div className="flex flex-1 flex-col">
									<p className="text-sm font-semibold text-[#225F22]">
										{action?.success}
									</p>
								</div>
							</div>
						)}
						<h1 className="text-heading-primary text-3xl font-bold">
							Reset your password
						</h1>
						{action?.success ? null : (
							<p className="mt-2.5 text-sm">
								Enter your email address and we'll send you a
								link to reset your password.
							</p>
						)}
						{action?.success ? null : (
							<>
								<Form
									method="post"
									action="/forgot-password"
									className="mt-8"
								>
									<div className="mb-6 flex flex-col gap-y-2">
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
									<div>
										<Button
											isLoading={isLoading}
											className="w-full"
											disabled={isLoading}
											type="submit"
										>
											{isLoading
												? 'Sending...'
												: 'Send reset link'}
										</Button>
									</div>
								</Form>
							</>
						)}
						<div className="mt-4">
							<p className="text-sm">
								<Link
									className="text-bg-primary inline-flex items-center gap-x-1.5 font-medium hover:underline"
									to="/login"
								>
									<svg
										className="rotate-90"
										width="15"
										height="9"
										viewBox="0 0 15 9"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
											d="M0.292893 0.292893C0.683417 -0.0976312 1.31658 -0.0976313 1.70711 0.292893L7.5 6.08578L13.2929 0.292891C13.6834 -0.0976335 14.3166 -0.0976336 14.7071 0.292891C15.0976 0.683415 15.0976 1.31658 14.7071 1.7071L8.91422 7.5C8.13317 8.28105 6.86684 8.28105 6.08579 7.5L0.292894 1.70711C-0.0976309 1.31658 -0.097631 0.683418 0.292893 0.292893Z"
										/>
									</svg>
									Back to login
								</Link>
							</p>
						</div>
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
