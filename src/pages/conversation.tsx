import { useLoaderData, useParams } from 'react-router';
import { MessageSendForm } from '../features/conversation/components/message-send-form';
import type { Conversation, Message } from '../types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { authProvider } from '../features/auth';

export function ConversationPage() {
	const currentUser = authProvider.user;
	const { conversationId } = useParams();
	const { conversation } = useLoaderData<{
		conversation: Conversation['conversation'];
	}>();

	const [messages, setMessages] = useState<Message[]>([]);

	const messageGroupByDay = useMemo(() => {
		return conversation.messages.reduce(
			(acc: Record<string, Message[]>, message) => {
				const day = new Date(message.createdAt).toLocaleDateString(
					'en-US',
					{
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
					}
				);
				acc[day] = acc[day] || [];
				acc[day].push(message);
				return acc;
			},
			{}
		);
	}, [conversation]);

	const getDate = (date: Date) => {
		if (date.toDateString() === new Date().toDateString()) {
			return 'Today';
		}
		if (
			date.toDateString() ===
			new Date(date.setDate(date.getDate() - 1)).toDateString()
		) {
			return 'Yesterday';
		}
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	useEffect(() => {
		if (conversation.messages) {
			setMessages(conversation.messages);
		}
	}, [conversation]);

	console.log({ messages, messageGroupByDay });

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex w-full items-center border-b border-[#E4E4E4] px-5 pt-6 pb-4">
				<div className="flex items-center gap-x-2.5">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
						<span className="text-sm font-medium">A</span>
					</div>
					<div className="flex flex-col">
						<p className="text-base font-semibold text-gray-900">
							John Doe
						</p>
						<p className="text-sm">Last seen 12:00 PM</p>
					</div>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-y-4 overflow-auto p-5">
				<div className="text-center">
					<span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
						Today
					</span>
				</div>
				<div className="flex justify-start">
					<div className="flex gap-x-2.5">
						<div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200">
							<span className="text-sm font-medium">A</span>
						</div>
						<div className="flex max-w-[340px] flex-col gap-y-2.5">
							<p className="rounded-lg rounded-bl-none border border-[#E4E4E4] px-4 py-2.5 text-base text-gray-900">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quisquam, quos.
							</p>
							<span className="text-xs">12:00 PM</span>
						</div>
					</div>
				</div>
				<div className="flex justify-end">
					<div className="flex">
						<div className="flex max-w-[340px] flex-col gap-y-2.5">
							<p className="rounded-lg rounded-br-none bg-[#f2f2f2] px-4 py-2.5 text-base text-gray-900">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quisquam, quos.
							</p>
							<p className="text-right text-xs">12:00 PM</p>
						</div>
					</div>
				</div>
				{Object.entries(messageGroupByDay).map(([day, messages]) => (
					<Fragment key={day}>
						<div className="text-center">
							<span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
								{getDate(new Date(day))}
							</span>
						</div>
						{messages.map((message) => {
							if (message.sender.id === currentUser?.id) {
								return (
									<div
										key={message.id}
										className="flex justify-end"
									>
										<div className="flex">
											<div className="flex max-w-[340px] flex-col gap-y-2.5">
												<p className="rounded-lg rounded-br-none bg-[#f2f2f2] px-4 py-2.5 text-base text-gray-900">
													{message.content}
												</p>
												<p className="text-right text-xs">
													{new Date(
														message.createdAt
													).toLocaleTimeString([], {
														hour: '2-digit',
														minute: '2-digit',
													})}
												</p>
											</div>
										</div>
									</div>
								);
							} else {
								return (
									<div
										key={message.id}
										className="flex justify-start"
									>
										<div className="flex gap-x-2.5">
											<div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200">
												<span className="text-sm font-medium">
													A
												</span>
											</div>
											<div className="flex max-w-[340px] flex-col gap-y-2.5">
												<p className="rounded-lg rounded-bl-none border border-[#E4E4E4] px-4 py-2.5 text-base text-gray-900">
													{message.content}
												</p>
												<span className="text-xs">
													{new Date(
														message.createdAt
													).toLocaleTimeString([], {
														hour: '2-digit',
														minute: '2-digit',
													})}
												</span>
											</div>
										</div>
									</div>
								);
							}
						})}
					</Fragment>
				))}
			</div>

			<div className="px-5 py-6">
				<MessageSendForm conversationId={conversationId as string} />
			</div>
		</div>
	);
}
