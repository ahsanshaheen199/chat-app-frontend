import { type LoaderFunctionArgs } from 'react-router';
import appAxios from '../../../lib/axios';
import type { Conversation } from '../../../types';

export async function conversationLoader({ params }: LoaderFunctionArgs) {
	try {
		const response = await appAxios.get<{
			data: {
				conversation: Conversation;
			};
		}>(`/api/conversations/${params.conversationId}/messages`);

		return response.data.data;
	} catch {
		return {};
	}
}
