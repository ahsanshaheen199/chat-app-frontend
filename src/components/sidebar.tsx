import { twMerge } from 'tailwind-merge';
import { useSidebarContext } from '../contexts/sidebar-context';
import { Link, useLocation } from 'react-router';
import { DashboardIcon } from './icons/dashboard';
import { MessageIcon } from './icons/message';

const menuItems = (pathname: string) => [
	{
		label: 'Dashboard',
		icon: (
			<DashboardIcon
				className={twMerge(
					'text-secondary group-hover/menu-item:text-white',
					pathname === '/dashboard' && 'text-white'
				)}
			/>
		),
		to: '/dashboard',
	},
	{
		label: 'Message',
		icon: (
			<MessageIcon
				className={twMerge(
					'text-secondary group-hover/menu-item:text-white',
					pathname === '/messages' && 'text-white'
				)}
			/>
		),
		to: '/messages',
	},
];

export function Sidebar() {
	const { isSidebarClosed } = useSidebarContext();
	const location = useLocation();
	const menuItemsWithPathname = menuItems(location.pathname);
	return (
		<div
			className={twMerge(
				'hidden w-[250px] bg-[#FCFCFC] px-4 py-6 transition-[width] duration-300 md:block',
				isSidebarClosed && 'w-[72px] px-2'
			)}
		>
			<div
				className={twMerge(
					'flex flex-col',
					isSidebarClosed && 'gap-y-3'
				)}
			>
				{menuItemsWithPathname.map((item, index) => (
					<Link
						className={twMerge(
							'group/menu-item hover:bg-bg-primary relative flex w-full items-center rounded-xl px-6 py-4 transition-colors duration-300',
							isSidebarClosed && 'justify-center px-2 py-2',
							location.pathname === item.to && 'bg-bg-primary'
						)}
						to={item.to}
						key={index}
					>
						<div className="flex items-center gap-x-3">
							{item.icon}

							<span
								className={twMerge(
									'text-base font-bold transition-[opacity,color,visibility] duration-300',
									'group-hover/menu-item:text-white',
									isSidebarClosed ? 'hidden' : 'inline',
									location.pathname === item.to &&
										'text-white'
								)}
							>
								{item.label}
							</span>
						</div>
						<div
							className={twMerge(
								'absolute top-1 left-[calc(100%+8px)] z-[-1] inline translate-x-[20px] opacity-0 transition-all duration-500 group-hover/menu-item:z-[1] group-hover/menu-item:translate-x-0 group-hover/menu-item:opacity-100',
								isSidebarClosed ? 'inline' : 'hidden'
							)}
						>
							<p className="text-secondary bg-bg-primary rounded-lg px-3 py-1.5 text-sm font-medium text-white">
								{item.label}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
