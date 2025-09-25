import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '../lib/socket';

type AuthContextType = {
	onlineUsers: { [key: string]: string };
	setOnlineUsers: React.Dispatch<
		React.SetStateAction<{ [key: string]: string }>
	>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: string }>(
		{}
	);

	useEffect(() => {
		socket.on('getOnlineUsers', (userIds: { [key: string]: string }) => {
			setOnlineUsers(userIds);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ onlineUsers, setOnlineUsers }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(
			'useAuthContext must be used within a AuthContextProvider'
		);
	}
	return context;
};

export { useAuthContext, AuthContextProvider };
