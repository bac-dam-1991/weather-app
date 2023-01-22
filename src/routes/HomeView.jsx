import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { SearchForm } from '../components/SearchForm';

export const HomeView = () => {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(false);
	const inputRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		window.addEventListener('keypress', (e) => {
			if (inputRef.current && inputRef.current !== document.activeElement) {
				inputRef.current.focus();
			}
		});

		return () => {
			window.removeEventListener('keypress', undefined);
		};
	}, []);

	return (
		<div className="container">
			<h1>Weather App</h1>
			<SearchForm
				setLoading={setLoading}
				setLocations={setLocations}
				ref={inputRef}
			/>
			{loading ? (
				<Loader />
			) : (
				<>
					{locations.map(({ Key, LocalizedName, Country }) => {
						return (
							<Card
								onClick={() => navigate(`/forecast/${Key}`)}
								key={Key}
								code={Key}
							>
								<span>
									{LocalizedName}, {Country.LocalizedName}
								</span>
							</Card>
						);
					})}
				</>
			)}
		</div>
	);
};
