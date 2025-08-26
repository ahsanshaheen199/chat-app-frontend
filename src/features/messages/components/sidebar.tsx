import { Link, useLoaderData, useLocation } from 'react-router';
import type { Conversation } from '../../../types';
import { authProvider } from '../../auth';
import { MessageSquarePlus } from '../../../components/icons/message-square-plus';
import { FormInput } from '../../../components/form/input';
import { Button } from '../../../components/form/button';
import { ConversationModal } from './conversation-modal';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function MessagesSidebar() {
	const conversations = useLoaderData() as Conversation[];
	const currentUser = authProvider.user;
	const [isConversationModalOpen, setIsConversationModalOpen] =
		useState(false);
	const location = useLocation();

	return (
		<div
			className={twMerge(
				'flex h-full w-full max-w-[350px] flex-none flex-col items-start pt-6 pr-10 pb-4 pl-5',
				conversations.length === 0 && 'items-center pr-5'
			)}
		>
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
					<div className="flex w-full flex-1 flex-col overflow-auto">
						{conversations.map((conversation, index) => (
							<div key={index} className="w-full">
								{conversation.conversation.conversationParticipents
									.filter(
										(participent) =>
											participent.user.id !==
											currentUser?.id
									)
									.map((participent, index) => (
										<Link
											key={index}
											to={`/messages/${conversation.conversation.id}`}
											className={twMerge(
												'hover:bg-bg-primary group flex w-full cursor-pointer items-center gap-x-2.5 rounded-md px-4 py-3',
												location.pathname ===
													`/messages/${conversation.conversation.id}` &&
													'bg-bg-primary text-white'
											)}
										>
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
												<span className="text-sm font-medium">
													{participent.user.firstName.charAt(
														0
													)}
													{participent.user.lastName.charAt(
														0
													)}
												</span>
											</div>
											<div className="flex-auto">
												<p
													className={twMerge(
														'text-sm font-semibold text-gray-900 group-hover:text-white',
														location.pathname ===
															`/messages/${conversation.conversation.id}` &&
															'text-white'
													)}
												>
													{participent.user.firstName}{' '}
													{participent.user.lastName}
												</p>
											</div>
										</Link>
									))}
							</div>
						))}
					</div>
					<div className="mt-5 w-full">
						<ConversationModal
							open={isConversationModalOpen}
							onOpenChange={setIsConversationModalOpen}
						>
							<button className="bg-bg-primary inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md">
								<MessageSquarePlus className="size-4 text-white" />
							</button>
						</ConversationModal>
					</div>
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
						<ConversationModal
							open={isConversationModalOpen}
							onOpenChange={setIsConversationModalOpen}
						>
							<Button>Create a new conversation</Button>
						</ConversationModal>
					</div>
				</div>
			)}
		</div>
	);
}
