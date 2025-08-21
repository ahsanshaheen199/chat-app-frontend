import { FormInput } from '../components/form/input';
import { FormLabel } from '../components/form/label';
import { Button } from '../components/form/button';
import { Form, Link, useActionData, useNavigation } from 'react-router';
import { useEffect, useState } from 'react';

export function SignupPage() {
	const action = useActionData() as {
		error?: string;
		errors?: Record<string, string[]>;
	};
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const [showError, setShowError] = useState(false);

	const navigation = useNavigation();
	const isLoading = navigation.state === 'submitting';

	useEffect(() => {
		let errorTimeout: NodeJS.Timeout;
		if (action?.errors) {
			setErrors(action.errors);
			setShowError(true);
			errorTimeout = setTimeout(() => {
				setShowError(false);
			}, 5000);
		}

		return () => clearTimeout(errorTimeout);
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
						<h1 className="text-heading-primary text-3xl font-bold">
							Sign up to your account
						</h1>
						<p className="mt-2.5 text-sm">
							Enter your details to sign up to your account.
						</p>
						<Form method="post" className="mt-8" action="/signup">
							<div className="mb-4 flex flex-col gap-y-2">
								<FormLabel
									htmlFor="firstName"
									className="inline-block"
								>
									First Name
								</FormLabel>
								<FormInput
									id="firstName"
									placeholder="John"
									type="text"
									name="firstName"
									isError={!!errors?.firstName}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.firstName;
										setErrors(newErrors);
									}}
								/>
								{errors?.firstName && (
									<p className="text-sm text-red-500">
										{action?.errors?.firstName.join(', ')}
									</p>
								)}
							</div>
							<div className="mb-4 flex flex-col gap-y-2">
								<FormLabel
									htmlFor="lastName"
									className="inline-block"
								>
									Last Name
								</FormLabel>
								<FormInput
									id="lastName"
									placeholder="Doe"
									type="text"
									name="lastName"
									isError={!!errors?.lastName}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.lastName;
										setErrors(newErrors);
									}}
								/>
								{errors?.lastName && (
									<p className="text-sm text-red-500">
										{action?.errors?.lastName.join(', ')}
									</p>
								)}
							</div>
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
									isError={!!errors?.email}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.email;
										setErrors(newErrors);
									}}
								/>
								{errors?.email && (
									<p className="text-sm text-red-500">
										{action?.errors?.email.join(', ')}
									</p>
								)}
							</div>
							<div className="mb-4 flex flex-col gap-y-2">
								<FormLabel
									htmlFor="password"
									className="inline-block"
								>
									Password
								</FormLabel>
								<FormInput
									id="password"
									placeholder="********"
									type="password"
									name="password"
									isError={!!errors?.password}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.password;
										setErrors(newErrors);
									}}
								/>
								{errors?.password && (
									<p className="text-sm text-red-500">
										{action?.errors?.password.join(', ')}
									</p>
								)}
							</div>
							<div className="mb-4 flex flex-col gap-y-2">
								<FormLabel
									htmlFor="confirmPassword"
									className="inline-block"
								>
									Confirm Password
								</FormLabel>
								<FormInput
									id="confirmPassword"
									placeholder="********"
									type="password"
									name="confirmPassword"
									isError={!!errors?.confirmPassword}
									onChange={() => {
										const newErrors = { ...errors };
										delete newErrors.confirmPassword;
										setErrors(newErrors);
									}}
								/>
								{errors?.confirmPassword && (
									<p className="text-sm text-red-500">
										{action?.errors?.confirmPassword.join(
											', '
										)}
									</p>
								)}
							</div>
							<div className="mt-4">
								<Button
									isLoading={isLoading}
									disabled={isLoading}
									className="w-full"
									type="submit"
								>
									{isLoading ? 'Signing up...' : 'Sign up'}
								</Button>
							</div>
							<div className="mt-4">
								<p className="text-center text-sm">
									Already have an account?{' '}
									<Link
										className="text-bg-primary font-medium hover:underline"
										to="/login"
									>
										Log in
									</Link>
								</p>
							</div>
						</Form>
					</div>
				</div>
			</div>
			<div className="relative hidden lg:block">
				<img
					src="/images/login.jpg"
					alt="Signup"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
