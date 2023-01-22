import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getForecast, getLocationDetails } from '../apis';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';

export const ForecastView = () => {
	const { locationKey } = useParams();
	const [forecast, setForecast] = useState([]);
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(false);

	const getData = useCallback(async () => {
		if (!locationKey) {
			return;
		}
		setLoading(true);
		const [forecast, locationDetails] = await Promise.all([
			getForecast(locationKey),
			getLocationDetails(locationKey),
		]);
		setForecast(forecast);
		setLocation(locationDetails);
		setLoading(false);
	}, [locationKey]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<div className="container">
			{location && (
				<>
					<h1>
						{location.LocalizedName}, {location.Country.LocalizedName}
					</h1>
					<Link to={'/'}>Back</Link>
				</>
			)}
			{loading ? (
				<Loader />
			) : (
				<>
					{forecast.map((forecast) => {
						return (
							<Card key={forecast.Date}>
								<div className="forecast-container">
									<span>
										<strong>
											{new Date(forecast.Date).toLocaleDateString()}
										</strong>
									</span>
									<span className="forecast-details">
										<span>{forecast.Day.IconPhrase}</span>
										<span>
											Minimum: {forecast.Temperature.Minimum.Value}
											{forecast.Temperature.Minimum.Unit}
										</span>
										<span>
											Maximum: {forecast.Temperature.Maximum.Value}
											{forecast.Temperature.Minimum.Unit}
										</span>
									</span>
								</div>
							</Card>
						);
					})}
				</>
			)}
		</div>
	);
};
