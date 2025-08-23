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
	};
}
