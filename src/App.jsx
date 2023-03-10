import { HashRouter, Routes, Route } from 'react-router-dom';
import { ForecastView } from './routes/ForecastView';
import { HomeView } from './routes/HomeView';

export const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route index path="/" element={<HomeView />} />
				<Route path="/forecast/:locationKey" element={<ForecastView />} />
			</Routes>
		</HashRouter>
	);
};
