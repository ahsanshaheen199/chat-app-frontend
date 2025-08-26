export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	isVerified: boolean;
	lastLoginAt: Date;
}

export interface Conversation {
	id: string;
	conversation: {
		id: string;
		conversationParticipents: {
			id: string;
			user: User;
		}[];
		messages: Message[];
	};
}

export type Message = {
	id: string;
	content: string;
	createdAt: Date;
	conversationId: string;
	sender: {
		id: string;
	};
};
