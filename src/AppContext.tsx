import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

interface IAppContext {
	appTitle: string;
	loginAsAdmin: () => void;
	password: string;
	setPassword: (password: string) => void;
	appMessage: string;
	deleteAppMessage: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = 'http://localhost:3611';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const appTitle = 'Info Site';
	const [password, setPassword] = useState('');
	const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
	const [appMessage, setAppMessage] = useState('');

	const loginAsAdmin = async () => {
		let _appMessage = '';
		try {
			const res = await axios.post(
				`${backendUrl}/login`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			setAdminIsLoggedIn(true);
			_appMessage = 'Welcome back admin.';
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					_appMessage =
						'Sorry, credentials were incorrect, please attempt login again.';
					break;
				case 'ERR_NETWORK':
					_appMessage =
						"Sorry, we aren't able to process your request at this time.";
					break;
				default:
					_appMessage = `Sorry, there was an unknown error (${e.code}).`;
					break;
			}
			setAdminIsLoggedIn(false);
		}
		setAppMessage(_appMessage);
	};

	const deleteAppMessage = () => {
		setAppMessage('');
	};

	return (
		<AppContext.Provider
			value={{
				appTitle,
				loginAsAdmin,
				password,
				setPassword,
				appMessage,
				deleteAppMessage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
