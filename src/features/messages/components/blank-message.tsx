import { MessageIcon } from '../../../components/icons/message';

export function BlankMessage() {
	return (
		<div className="flex h-full w-full flex-1 flex-col items-center justify-center p-16">
			<div className="max-w-md text-center">
				{/* Icon Display */}
				<div className="mb-4 flex justify-center gap-4">
					<div className="relative">
						<div className="bg-bg-primary flex h-16 w-16 items-center justify-center rounded-2xl">
							<MessageIcon className="h-8 w-8 text-white" />
						</div>
					</div>
				</div>

				{/* Welcome Text */}
				<h2 className="mb-3 text-2xl font-bold text-gray-900">
					Welcome to Chat App!
				</h2>
				<p className="text-base">
					Select a conversation from the sidebar to start chating
				</p>
			</div>
		</div>
	);
}
