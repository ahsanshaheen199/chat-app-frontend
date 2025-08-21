import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

const MOBILE_BREAKPOINT = 768;

type SidebarContextType = {
	isSidebarClosed: boolean;
	setIsSidebarClosed: React.Dispatch<React.SetStateAction<boolean>>;
	isMobile: boolean;
};

type SidebarContextProviderProps = {
	children: ReactNode;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarContextProvider = ({ children }: SidebarContextProviderProps) => {
	const [isSidebarClosed, setIsSidebarClosed] = useState(
		localStorage.getItem('isSidebarClosed') === 'true'
	);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`
		);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener('change', onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener('change', onChange);
	}, []);

	return (
		<SidebarContext.Provider
			value={{ isSidebarClosed, setIsSidebarClosed, isMobile }}
		>
			{children}
		</SidebarContext.Provider>
	);
};

const useSidebarContext = () => {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error(
			'useSidebarContext must be used within a SidebarContextProvider'
		);
	}
	return context;
};

export { SidebarContextProvider, useSidebarContext };
