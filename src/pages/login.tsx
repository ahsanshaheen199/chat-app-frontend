import { Link } from 'react-router';
import { FormInput } from '../components/form/input';
import { FormLabel } from '../components/form/label';
import { Button } from '../components/form/button';

export function LoginPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						<h1 className="text-heading-primary text-3xl font-bold">
							Log in to your account
						</h1>
						<p className="mt-2.5 text-sm">
							Enter your email and password to log in to your
							account.
						</p>
						<form className="mt-8">
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
								/>
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
								/>
							</div>
							<div>
								<Button className="w-full">Log in</Button>
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
					src="./images/login.jpg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}
