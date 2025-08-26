import { useEffect, useRef, useState } from 'react';
import { FormInput } from '../../../components/form/input';
import appAxios from '../../../lib/axios';
import EmojiPicker from 'emoji-picker-react';

export function MessageSendForm({
	conversationId,
}: {
	conversationId: string;
}) {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await appAxios.post(
				`/api/conversations/${conversationId}/messages`,
				{
					content: message,
				}
			);
			setMessage('');
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target as Node)
			) {
				setIsEmojiPickerOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<form
			method="post"
			className="flex w-full items-center gap-x-2.5"
			onSubmit={handleSubmit}
		>
			<div className="focus-within:ring-bg-primary relative flex h-14 flex-1 items-center gap-x-3.5 rounded-lg bg-[#F2f2f2] px-2.5 ring-1 ring-[#E4E4E4] focus-within:ring-2">
				<FormInput
					disabled={isLoading}
					placeholder="Write a message..."
					className="flex-1 bg-transparent ring-0 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
					name="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				{isEmojiPickerOpen && (
					<div
						ref={emojiPickerRef}
						className="absolute right-0 bottom-[calc(100%+10px)] z-50"
					>
						<EmojiPicker
							width={300}
							onEmojiClick={(emoji) => {
								setMessage(message + emoji.emoji);
								setIsEmojiPickerOpen(false);
							}}
						/>
					</div>
				)}
				<button
					type="button"
					className="cursor-pointer"
					onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_330_3876)">
							<path
								d="M9 17.25C4.4475 17.25 0.75 13.5525 0.75 9C0.75 4.4475 4.4475 0.75 9 0.75C13.5525 0.75 17.25 4.4475 17.25 9C17.25 13.5525 13.5525 17.25 9 17.25ZM9 2.25C5.28 2.25 2.25 5.28 2.25 9C2.25 12.72 5.28 15.75 9 15.75C12.72 15.75 15.75 12.72 15.75 9C15.75 5.28 12.72 2.25 9 2.25Z"
								fill="#808191"
							/>
							<path
								d="M12 12.75C11.775 12.75 11.55 12.645 11.4 12.45C11.3775 12.4275 10.4475 11.25 8.99999 11.25C7.53749 11.25 6.60749 12.4425 6.59999 12.45C6.35249 12.78 5.87999 12.84 5.54999 12.5925C5.21999 12.345 5.15249 11.88 5.39999 11.55C5.45249 11.475 6.77249 9.75 8.99999 9.75C11.2275 9.75 12.5475 11.475 12.6 11.55C12.8475 11.88 12.78 12.3525 12.45 12.6C12.315 12.705 12.1575 12.75 12 12.75Z"
								fill="#808191"
							/>
							<path
								d="M6.75751 7.5C6.34501 7.5 6.00751 7.1625 6.00751 6.75C6.00751 6.3375 6.33751 6 6.75001 6H6.75751C7.17001 6 7.50751 6.3375 7.50751 6.75C7.50751 7.1625 7.17001 7.5 6.75751 7.5Z"
								fill="#808191"
							/>
							<path
								d="M11.2575 7.5C10.845 7.5 10.5075 7.1625 10.5075 6.75C10.5075 6.3375 10.8375 6 11.25 6H11.2575C11.67 6 12.0075 6.3375 12.0075 6.75C12.0075 7.1625 11.67 7.5 11.2575 7.5Z"
								fill="#808191"
							/>
						</g>
						<defs>
							<clipPath id="clip0_330_3876">
								<rect width="18" height="18" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</button>
				<div className="flex items-center">
					<label htmlFor="file-upload" className="cursor-pointer">
						<span>
							<svg
								className="text-text-secondary"
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_330_3875)">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M9.58145 2.06301C10.4302 1.2433 11.5669 0.789722 12.7468 0.799975C13.9266 0.810228 15.0553 1.28349 15.8896 2.11782C16.724 2.95216 17.1972 4.08082 17.2075 5.2607C17.2177 6.44059 16.7642 7.5773 15.9445 8.42601L15.9353 8.4353L13.6854 10.6852C13.2292 11.1416 12.6802 11.4945 12.0756 11.72C11.471 11.9455 10.825 12.0384 10.1814 11.9923C9.53777 11.9462 8.91158 11.7622 8.34531 11.4529C7.77903 11.1435 7.28592 10.7159 6.89941 10.1992C6.65131 9.86752 6.71906 9.39751 7.05075 9.1494C7.38244 8.9013 7.85245 8.96905 8.10056 9.30074C8.35823 9.64522 8.68697 9.93025 9.06449 10.1365C9.442 10.3428 9.85946 10.4654 10.2885 10.4961C10.7176 10.5269 11.1483 10.465 11.5514 10.3146C11.9544 10.1643 12.3204 9.92898 12.6246 9.62474L12.6247 9.62464L14.8698 7.37951C15.4136 6.81418 15.7144 6.05828 15.7075 5.27374C15.7007 4.48715 15.3852 3.73471 14.829 3.17848C14.2727 2.62226 13.5203 2.30675 12.7337 2.29992C11.9488 2.2931 11.1926 2.59415 10.6272 3.13838L9.34127 4.41685C9.04752 4.70889 8.57265 4.7075 8.28061 4.41376C7.98857 4.12001 7.98996 3.64514 8.2837 3.3531L9.5737 2.0706L9.58145 2.06301Z"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.92439 6.28001C6.52897 6.05448 7.17499 5.96162 7.81862 6.00771C8.46224 6.05381 9.08843 6.23779 9.65471 6.54717C10.221 6.85655 10.7141 7.2841 11.1006 7.80081C11.3487 8.1325 11.2809 8.60251 10.9493 8.85062C10.6176 9.09873 10.1476 9.03097 9.89945 8.69928C9.64178 8.3548 9.31304 8.06977 8.93552 7.86352C8.55801 7.65726 8.14055 7.53461 7.71146 7.50388C7.28238 7.47315 6.8517 7.53506 6.44865 7.68541C6.04559 7.83576 5.67959 8.07104 5.37545 8.37528L3.13022 10.6205C2.58644 11.1858 2.28565 11.9417 2.29247 12.7263C2.29931 13.5129 2.61481 14.2653 3.17104 14.8215C3.72726 15.3778 4.4797 15.6933 5.26629 15.7001C6.05082 15.7069 6.80672 15.4061 7.37205 14.8624L8.6497 13.5847C8.94259 13.2918 9.41746 13.2918 9.71036 13.5847C10.0033 13.8776 10.0033 14.3525 9.71036 14.6454L8.42786 15.9279L8.41856 15.937C7.56985 16.7567 6.43314 17.2103 5.25326 17.2C4.07337 17.1898 2.94471 16.7165 2.11038 15.8822C1.27604 15.0479 0.802781 13.9192 0.792529 12.7393C0.782276 11.5594 1.23585 10.4227 2.05556 9.57401L2.0647 9.56472L4.3146 7.31481C4.31457 7.31484 4.31463 7.31478 4.3146 7.31481C4.77078 6.8585 5.31985 6.50552 5.92439 6.28001Z"
									/>
								</g>
								<defs>
									<clipPath id="clip0_330_3875">
										<rect
											width="18"
											height="18"
											fill="white"
										/>
									</clipPath>
								</defs>
							</svg>
						</span>
						<input
							type="file"
							id="file-upload"
							className="hidden"
						/>
					</label>
				</div>
			</div>
			<button
				type="submit"
				className="inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg bg-[#f2f2f2] disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isLoading}
			>
				{isLoading ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="animate-spin"
					>
						<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
					</svg>
				) : (
					<>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_330_3877)">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M17.0303 0.96967C17.3232 1.26256 17.3232 1.73744 17.0303 2.03033L8.78033 10.2803C8.48744 10.5732 8.01256 10.5732 7.71967 10.2803C7.42678 9.98744 7.42678 9.51256 7.71967 9.21967L15.9697 0.96967C16.2626 0.676777 16.7374 0.676777 17.0303 0.96967Z"
									fill="#475BE8"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M17.0303 0.969691C17.2341 1.17342 17.3031 1.47584 17.2079 1.74778L11.9579 16.7478C11.8563 17.038 11.5878 17.2369 11.2806 17.2494C10.9733 17.2619 10.6895 17.0856 10.5646 16.8046L7.6818 10.3182L1.1954 7.43538C0.914389 7.31049 0.738092 7.02671 0.750627 6.71945C0.763163 6.41219 0.961991 6.14371 1.25224 6.04213L16.2522 0.792127C16.5242 0.696948 16.8266 0.765962 17.0303 0.969691ZM3.53331 6.83297L8.55461 9.06466C8.72428 9.14007 8.85995 9.27574 8.93536 9.44542L11.167 14.4667L15.2775 2.7225L3.53331 6.83297Z"
									fill="#475BE8"
								/>
							</g>
							<defs>
								<clipPath id="clip0_330_3877">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</>
				)}
			</button>
		</form>
	);
}
