import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';

export const PageAdmin = () => {
	const { appTitle, loginAsAdmin, password, setPassword } = useContext(AppContext);

	return (
		<div className="pageLogin">
			<Helmet>
				<title>{appTitle} - Admin</title>
			</Helmet>
			<p>Identify as admin: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <button onClick={loginAsAdmin} type="button">Confirm</button></p>
		</div>
	);
};