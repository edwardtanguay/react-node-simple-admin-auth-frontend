import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

interface IAppContext {
	appTitle: string;
	loginAsAdmin: () => void;
	password: string;
	setPassword: (password: string) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = 'http://localhost:3611';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const appTitle = 'Info Site';
	const [password, setPassword] = useState('');

	const loginAsAdmin = () => {
		(async () => {
			(
				await axios.post(
					`${backendUrl}/login`,
					{
						password,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
			).data;
		})();
	};

	return (
		<AppContext.Provider
			value={{
				appTitle,
				loginAsAdmin,
				password,
				setPassword,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
