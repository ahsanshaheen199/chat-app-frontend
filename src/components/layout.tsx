import { SidebarContextProvider } from '../contexts/sidebar-context';
import { Sidebar } from './sidebar';
import { HeaderTop } from '../features/dashboard/components/header-top';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-svh w-full flex-col bg-[#F4F4F4]">
			<SidebarContextProvider>
				<HeaderTop />
				<div className="mt-1 flex flex-1">
					<Sidebar />
					<div className="flex-1 px-5 py-7">{children}</div>
				</div>
			</SidebarContextProvider>
		</div>
	);
}
