import * as Dialog from '@radix-ui/react-dialog';
import { FormLabel } from '../../../components/form/label';
import { FormInput } from '../../../components/form/input';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import appAxios from '../../../lib/axios';
import type { User } from '../../../types';
import { useRevalidator } from 'react-router';

type ConversationModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
};

export function ConversationModal({
	open,
	onOpenChange,
	children,
}: ConversationModalProps) {
	const [search, setSearch] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [isLoading, setIsLoading] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState(search);
	const revalidate = useRevalidator();

	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedSearch(search);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [search]);

	useEffect(() => {
		if (debouncedSearch.length === 0) {
			setUsers([]);
		} else {
			setIsLoading(true);

			const searchedFor = debouncedSearch;
			appAxios
				.get<{ data: { users: User[] } }>(
					`/api/users?search=${debouncedSearch}`
				)
				.then(async (response) => {
					if (searchedFor !== inputRef.current?.value) {
						return;
					}

					const result = await response.data.data;
					setIsLoading(false);
					setUsers(result.users);
				})
				.catch((error) => {
					console.error(error);
					setIsLoading(false);
					setUsers([]);
				});
		}
	}, [debouncedSearch, inputRef]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				inputRef.current?.blur();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	const onClose = () => {
		setSearch('');
		setUsers([]);
		setIsLoading(false);
		setHighlightedIndex(-1);
		setDebouncedSearch('');
		setIsOpen(false);
	};

	const createConversation = async (userId: string) => {
		try {
			await appAxios.post('/api/conversations', {
				participentId: userId,
			});
			onOpenChange(false);
			onClose();
			revalidate.revalidate();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={(open) => {
				onOpenChange(open);
				onClose();
			}}
		>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
				<Dialog.Content
					ref={dropdownRef}
					className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-5 rounded-lg border bg-white p-6 pb-8 shadow-lg duration-200 sm:max-w-[425px]"
				>
					<Dialog.Title className="text-lg font-bold text-gray-900">
						Create a new conversation
					</Dialog.Title>
					<div className="relative flex flex-col">
						<FormLabel
							className="mb-2 inline-block"
							htmlFor="search"
						>
							Search for a user
						</FormLabel>
						<FormInput
							ref={inputRef}
							id="search"
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setIsOpen(e.target.value.length > 0);
								setIsLoading(true);
								setHighlightedIndex(-1);
							}}
						/>
						{isOpen && (
							<div className="absolute top-full z-10 w-full rounded border border-black/10 bg-white shadow-lg">
								{users?.length > 0 ? (
									users.map((user, index) => {
										return (
											<div key={user.id}>
												<div
													onMouseEnter={() =>
														setHighlightedIndex(
															index
														)
													}
													onClick={() => {
														onClose();
														createConversation(
															user.id
														);
													}}
													className={twMerge(
														'flex cursor-pointer items-center gap-x-2.5 p-3',
														highlightedIndex ===
															index &&
															'bg-gray-100'
													)}
												>
													<span className="text-sm text-black">
														{user.firstName}{' '}
														{user.lastName}
													</span>
												</div>
											</div>
										);
									})
								) : isLoading ? (
									<div className="flex h-[100px] items-center justify-center">
										<p className="text-sm">Loading...</p>
									</div>
								) : (
									<div className="flex h-[100px] items-center justify-center">
										<p className="text-sm">
											No results found
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
