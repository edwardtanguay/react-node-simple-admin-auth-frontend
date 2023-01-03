import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { PageWelcome } from './pages/PageWelcome';
import { PageInfo } from './pages/PageInfo';
import { PageAdmin } from './pages/PageAdmin';

function App() {
	const { appMessage, deleteAppMessage, adminIsLoggedIn } =
		useContext(AppContext);
	return (
		<div className="App">
			{adminIsLoggedIn ? (
				<h1 className="adminMode">Admin Mode</h1>
			) : (
				<h1>Info Site</h1>
			)}
			{appMessage && (
				<div className="appMessage">
					<div className="inner">
						<div className="messageText">{appMessage}</div>{' '}
						<button onClick={deleteAppMessage}>X</button>
					</div>
				</div>
			)}
			<nav>
				<NavLink to="/welcome">Welcome</NavLink>
				<NavLink to="/info">Info</NavLink>
				<NavLink to="/admin">Admin</NavLink>
			</nav>

			<Routes>
				<Route path="/welcome" element={<PageWelcome />} />
				<Route path="/info" element={<PageInfo />} />
				<Route path="/admin" element={<PageAdmin />} />
				<Route path="/" element={<Navigate to="/welcome" replace />} />
			</Routes>
		</div>
	);
}

export default App;
