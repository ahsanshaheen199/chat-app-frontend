import { useEffect, useRef, useState } from 'react';
import { FormInput } from '../components/form/input';
import { Button } from '../components/form/button';
import appAxios from '../lib/axios';
import { authProvider } from '../features/auth';
import { useNavigate } from 'react-router';
import type { User } from '../types';

const CODE_LENGTH = 6;

export function VerifyEmailPage() {
	const inputRef = useRef<HTMLInputElement[]>([]);
	const [inputCode, setInputCode] = useState<string[]>(
		Array.from({ length: CODE_LENGTH }, () => '')
	);
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		if (isNaN(Number(e.target.value))) {
			return;
		}

		const value = e.target.value.trim();

		const newInputCode = [...inputCode];
		newInputCode[index] = value.slice(0, 1);
		setInputCode(newInputCode);

		if (index < CODE_LENGTH - 1 && value.length > 0) {
			inputRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace') {
			const value = e.currentTarget.value;
			if (value.length === 0) {
				inputRef.current[index - 1]?.focus();
			}
		}
	};

	useEffect(() => {
		inputRef.current[0]?.focus();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await appAxios.post<{ data: { user: User } }>(
				'/api/auth/verify-email',
				{
					code: inputCode.join(''),
				}
			);

			authProvider.user = response.data.data.user;
			authProvider.isAuthenticated = true;
			localStorage.setItem(
				'user',
				JSON.stringify(response.data.data.user)
			);

			navigate('/');
		} catch (error) {
			console.error(error);
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		let errorTimeout: NodeJS.Timeout;
		if (showError) {
			errorTimeout = setTimeout(() => {
				setShowError(false);
			}, 5000);
		}
		return () => clearTimeout(errorTimeout);
	}, [showError]);

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						{showError && (
							<div className="mb-5 flex w-full justify-between rounded-lg border border-[#571B23]/10 bg-[rgba(255,229,229,1)] p-5">
								<div className="flex flex-1 flex-col">
									<p className="text-sm font-semibold text-[#9F2225]">
										Invalid code
									</p>
								</div>
							</div>
						)}
						<h1 className="text-heading-primary text-3xl font-bold">
							Verify your email
						</h1>
						<p className="mt-2.5 text-sm">
							Enter the code sent to your email to verify your
							email.
						</p>
						<form onSubmit={handleSubmit} className="mt-8">
							<div className="mb-8 flex gap-x-4">
								{Array.from({ length: CODE_LENGTH }).map(
									(_, index) => (
										<FormInput
											key={index}
											className="w-1/6 text-center"
											type="text"
											value={inputCode[index] || ''}
											ref={(el) => {
												if (el) {
													inputRef.current[index] =
														el;
												}
											}}
											onChange={(e) =>
												handleInputChange(e, index)
											}
											onKeyDown={(e) =>
												handleKeyDown(e, index)
											}
										/>
									)
								)}
							</div>
							<div>
								<Button
									type="submit"
									isLoading={isLoading}
									className="w-full"
									disabled={isLoading}
								>
									{isLoading
										? 'Verifying...'
										: 'Verify Email'}
								</Button>
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
