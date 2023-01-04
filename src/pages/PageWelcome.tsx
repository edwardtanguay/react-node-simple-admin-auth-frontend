import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';

export const PageWelcome = () => {
	const { appTitle, welcomeMessage, adminIsLoggedIn } =
		useContext(AppContext);

	return (
		<div className="pageWelcome">
			<Helmet>
				<title>{appTitle} - Welcome</title>
			</Helmet>
			<p>
				{welcomeMessage}
				{adminIsLoggedIn && (
					<>
						{' '}
						<button>Edit</button>
					</>
				)}
			</p>
		</div>
	);
};
