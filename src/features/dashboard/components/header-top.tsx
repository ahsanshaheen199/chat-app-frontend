import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link, useFetcher } from 'react-router';
import { authProvider } from '../../auth';
import { useSidebarContext } from '../../../contexts/sidebar-context';

export function HeaderTop() {
	const fetcher = useFetcher();
	const isLoggingOut = fetcher.formData != null;
	const { isSidebarClosed, setIsSidebarClosed } = useSidebarContext();

	return (
		<div className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-5 py-4">
			<div className="hidden w-[230px] items-center gap-x-3 md:flex">
				<svg
					width="39"
					height="36"
					viewBox="0 0 39 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M29.8398 16.9045C30.0314 17.2378 30.1322 17.6156 30.1322 18C30.1322 18.3845 30.0314 18.7622 29.8398 19.0955L25.531 26.5289C25.3385 26.8608 25.0622 27.1363 24.7298 27.3279C24.3975 27.5194 24.0206 27.6204 23.637 27.6206L15.0656 27.6206C14.6846 27.6177 14.3109 27.5155 13.9815 27.324C13.652 27.1326 13.3782 26.8585 13.187 26.5289L8.87818 19.0955C8.68663 18.7622 8.58582 18.3845 8.58582 18C8.58582 17.6156 8.68663 17.2378 8.87818 16.9045L11.2583 12.8001L16.5546 21.8575C16.6418 22.0126 16.7691 22.1413 16.9232 22.2302C17.0772 22.3191 17.2524 22.3649 17.4302 22.3628L21.2877 22.3628C21.4656 22.3649 21.6408 22.3191 21.7948 22.2302C21.9489 22.1413 22.0762 22.0126 22.1634 21.8575L24.0921 18.4899C24.1795 18.3386 24.2255 18.167 24.2255 17.9923C24.2255 17.8176 24.1795 17.646 24.0921 17.4947L15.3973 2.45046C15.0956 1.92868 14.662 1.49541 14.14 1.19412C13.618 0.892825 13.0259 0.7341 12.4232 0.733871L11.644 0.733871C10.9544 0.733608 10.2769 0.914936 9.6797 1.25961C9.08244 1.60428 8.58648 2.10015 8.24169 2.69734L0.526706 16.0404C0.181668 16.6372 -7.84862e-07 17.3145 -7.54727e-07 18.0039C-7.24593e-07 18.6933 0.181668 19.3705 0.526706 19.9673L8.2417 33.3104C8.58697 33.9069 9.08314 34.402 9.68036 34.746C10.2776 35.0899 10.9548 35.2707 11.644 35.27L27.074 35.27C27.7636 35.2703 28.441 35.089 29.0383 34.7443C29.6355 34.3996 30.1315 33.9037 30.4763 33.3066L38.1913 19.9635C38.5363 19.3666 38.718 18.6894 38.718 18C38.718 17.3106 38.5363 16.6334 38.1913 16.0366L30.4763 2.69348C30.1315 2.09629 29.6355 1.60042 29.0383 1.25575C28.441 0.911074 27.7636 0.729754 27.074 0.730014L20.5162 0.730014L29.8398 16.9045Z"
						fill="#475BE8"
					/>
				</svg>
				<h1 className="text-2xl font-bold text-gray-900">Chat App</h1>
			</div>
			<div className="flex flex-1 items-center justify-between">
				<button
					className="cursor-pointer"
					onClick={() => {
						setIsSidebarClosed(!isSidebarClosed);
						localStorage.setItem(
							'isSidebarClosed',
							isSidebarClosed ? 'false' : 'true'
						);
					}}
				>
					{isSidebarClosed ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect width="18" height="18" x="3" y="3" rx="2" />
							<path d="M9 3v18" />
							<path d="m14 9 3 3-3 3" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect width="18" height="18" x="3" y="3" rx="2" />
							<path d="M9 3v18" />
							<path d="m16 15-3-3 3-3" />
						</svg>
					)}
				</button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild>
						<button className="flex cursor-pointer items-center gap-x-2.5">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
								<span className="text-sm font-medium">
									{authProvider.user?.firstName.charAt(0)}{' '}
									{authProvider.user?.lastName.charAt(0)}
								</span>
							</div>
							<div className="flex-auto">
								<p className="text-sm font-semibold text-gray-900">
									{authProvider.user?.firstName}{' '}
									{authProvider.user?.lastName}
								</p>
							</div>
						</button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Portal>
						<DropdownMenu.Content
							sideOffset={18}
							className="w-[192px] rounded-[10px] bg-[#FCFCFC] p-2.5 shadow-[0_40px_50px_1px_rgba(120,114,114,0.15)]"
						>
							<div className="group/item flex cursor-pointer items-center gap-x-2.5 p-2.5">
								<svg
									className="group-hover/item:fill-bg-primary fill-text-secondary flex-none"
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM13.2852 12.3004C13.5312 12.5513 13.5312 12.9488 13.2852 13.1997C12.1963 14.3107 10.6786 15 9.00005 15C7.3214 15 5.80375 14.3106 4.71477 13.1996C4.46884 12.9487 4.46885 12.5512 4.71478 12.3003C5.80376 11.1893 7.32136 10.5 8.99997 10.5C10.6786 10.5 12.1963 11.1894 13.2852 12.3004ZM9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z"
									/>
								</svg>
								<Link
									className="group-hover/item:text-bg-primary flex-1 text-sm font-medium"
									to="/profile"
								>
									Profile
								</Link>
							</div>
							<div className="group/item flex cursor-pointer items-center gap-x-2.5 p-2.5">
								<svg
									className="group-hover/item:fill-bg-primary fill-text-secondary flex-none"
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M9 1.5C10.2426 1.5 11.25 2.50736 11.25 3.75V8.25H7.5C7.08579 8.25 6.75 8.58579 6.75 9C6.75 9.41421 7.08579 9.75 7.5 9.75H11.25V14.25C11.25 15.4926 10.2426 16.5 9 16.5H4.5C3.25736 16.5 2.25 15.4926 2.25 14.25V3.75C2.25 2.50736 3.25736 1.5 4.5 1.5H9Z" />
									<path d="M11.25 9.75L13.5643 9.75L12.2197 11.0947C11.9268 11.3876 11.9268 11.8624 12.2197 12.1553C12.5126 12.4482 12.9874 12.4482 13.2803 12.1553L15.375 10.0607C15.9608 9.47487 15.9608 8.52513 15.375 7.93934L13.2803 5.84467C12.9874 5.55178 12.5126 5.55178 12.2197 5.84467C11.9268 6.13756 11.9268 6.61244 12.2197 6.90533L13.5643 8.25L11.25 8.25V9.75Z" />
								</svg>

								<fetcher.Form method="post" action="/logout">
									<button
										className="group-hover/item:text-bg-primary flex-1 cursor-pointer text-sm font-medium"
										type="submit"
										disabled={isLoggingOut}
									>
										{isLoggingOut
											? 'Logging out...'
											: 'Logout'}
									</button>
								</fetcher.Form>
							</div>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
		</div>
	);
}
