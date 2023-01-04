import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

interface IAppContext {
	appTitle: string;
	loginAsAdmin: (callback: () => void) => void;
	logoutAsAdmin: () => void;
	password: string;
	setPassword: (password: string) => void;
	appMessage: string;
	deleteAppMessage: () => void;
	adminIsLoggedIn: boolean;
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

	useEffect(() => {
		(async () => {
			try {
				const user = (await axios.post(`${backendUrl}/currentuser`, {}, { withCredentials: true }))
					.data;
				if (user === 'admin') {
					setAdminIsLoggedIn(true);
				}
			} catch (e) {
				console.log('no one logged in');
			}
		})();
	}, []);

	const loginAsAdmin = async (callback: () => void) => {
		let _appMessage = '';
		try {
			await axios.post(
				`${backendUrl}/login`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			setAdminIsLoggedIn(true);
			callback();
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
		setPassword('');
	};

	const deleteAppMessage = () => {
		setAppMessage('');
	};

	const logoutAsAdmin = () => {
		setAdminIsLoggedIn(false);
	};

	return (
		<AppContext.Provider
			value={{
				appTitle,
				loginAsAdmin,
				logoutAsAdmin,
				password,
				setPassword,
				appMessage,
				deleteAppMessage,
				adminIsLoggedIn,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
