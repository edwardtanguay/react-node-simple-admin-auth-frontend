import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

interface IAppContext {
	appTitle: string;
	testMessage: string;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = 'http://localhost:3611'; 

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const appTitle = 'Info Site';
	const [testMessage, setTestMessage] = useState('');

	useEffect(() => {
		(async () => {
			const data = (await axios.get(`${backendUrl}/test`)).data;
			setTestMessage(data.message);
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{
				appTitle,
				testMessage
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
