import { useLoaderData } from 'react-router';
import type { Conversation } from '../../../types';
import { authProvider } from '../../auth';
import { MessageSquarePlus } from '../../../components/icons/message-square-plus';
import { FormInput } from '../../../components/form/input';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from '../../../components/form/button';

export function MessagesSidebar() {
	const conversations = useLoaderData() as Conversation[];
	const currentUser = authProvider.user;

	return (
		<div className="flex w-full max-w-[350px] flex-none flex-col items-start overflow-auto pt-6 pr-10 pb-4 pl-5">
			{conversations.length > 0 ? (
				<>
					<div className="mb-5 flex w-full items-center gap-x-2">
						<div className="flex-1">
							<FormInput
								placeholder="Search"
								className="w-full rounded-md placeholder:text-[#808191] lg:text-sm"
							/>
						</div>
					</div>
					<div className="flex flex-grow flex-col gap-y-2">
						{conversations.map((conversation, index) => (
							<div key={index}>
								{conversation.conversation.conversationParticipents
									.filter(
										(participent) =>
											participent.user.id !==
											currentUser?.id
									)
									.map((participent) => (
										<div key={participent.id}>
											{participent.user.firstName}
										</div>
									))}
							</div>
						))}
					</div>
					<Tooltip.Provider>
						<Tooltip.Root delayDuration={0}>
							<Tooltip.Trigger asChild>
								<button className="cursor-pointer">
									<MessageSquarePlus className="text-text-secondary size-6" />
								</button>
							</Tooltip.Trigger>
							<Tooltip.Portal>
								<Tooltip.Content className="rounded-md bg-black p-2 text-sm text-white">
									<p>Create a new conversation</p>
									<Tooltip.Arrow className="fill-black" />
								</Tooltip.Content>
							</Tooltip.Portal>
						</Tooltip.Root>
					</Tooltip.Provider>
				</>
			) : (
				<div className="flex h-full flex-col items-center justify-center gap-y-2">
					<div className="flex flex-col text-center">
						<h1 className="mb-2 text-lg font-medium">
							No conversations
						</h1>
						<p className="mb-3 text-sm">
							Start a new conversation to get started
						</p>
						<Button>Create a new conversation</Button>
					</div>
				</div>
			)}
		</div>
	);
}
