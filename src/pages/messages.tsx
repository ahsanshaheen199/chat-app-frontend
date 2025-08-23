import { Outlet } from 'react-router';
import { Layout } from '../components/layout';
import { MessagesSidebar } from '../features/messages/components/sidebar';

export function MessagesPage() {
	return (
		<Layout>
			<div className="mx-auto flex h-full w-full max-w-7xl gap-x-10 rounded-2xl bg-white">
				<MessagesSidebar />
				<div className="flex-1 border-l border-[#E4E4E4]">
					<Outlet />
				</div>
			</div>
		</Layout>
	);
}
