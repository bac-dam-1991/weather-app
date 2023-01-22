const apikey = '9TViq3q1Hhpv1Hbhvso2ZwNq7m4n3fvH';
// const baseUrl = 'https://302f8f6c-8bf1-4870-91ea-f92042e4e483.mock.pstmn.io';
const baseUrl = 'http://dataservice.accuweather.com';

const fetchWrapper = async ({ url, params }) => {
	const fullUrl = `${url}?${params.toString()}`;
	const response = await fetch(fullUrl);
	const data = await response.json();
	return data;
};

export const getForecast = async (locationKey) => {
	const params = new URLSearchParams({ apikey, metric: 'true' });
	const url = `${baseUrl}/forecasts/v1/daily/5day/${locationKey}`;
	return await fetchWrapper({ url, params });
};

export const searchLocation = async (q) => {
	const params = new URLSearchParams({ q, apikey });
	const url = `${baseUrl}/locations/v1/cities/search`;
	return await fetchWrapper({ url, params });
};

export const getLocationDetails = async (locationKey) => {
	const params = new URLSearchParams({ apikey });
	const url = `${baseUrl}/locations/v1/${locationKey}`;
	return await fetchWrapper({ url, params });
};
