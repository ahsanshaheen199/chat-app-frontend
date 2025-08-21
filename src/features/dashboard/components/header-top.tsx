import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link, useFetcher } from 'react-router';
import { authProvider } from '../../auth';

export function HeaderTop() {
	const fetcher = useFetcher();
	const isLoggingOut = fetcher.formData != null;
	return (
		<div className="fixed top-0 left-0 flex w-full items-center justify-between bg-white px-5 py-4">
			<div className=""></div>
			<div className="w-[220px]">
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
										className="group-hover/item:text-bg-primary flex-1 text-sm font-medium"
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
