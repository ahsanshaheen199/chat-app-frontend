import { redirect } from 'react-router';
import { authProvider } from '../../auth';
import appAxios from '../../../lib/axios';
import type { Conversation } from '../../../types';

export async function messagesLoader() {
	const { isAuthenticated } = authProvider;

	if (!isAuthenticated) {
		return redirect('/login');
	}

	try {
		const response = await appAxios.get<{
			data: { conversations: Conversation[] };
		}>('/api/conversations');
		return response.data.data.conversations;
	} catch {
		return [];
	}
}
