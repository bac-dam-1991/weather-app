import { forwardRef } from 'react';
import { useCallback, useState } from 'react';
import { searchLocation } from '../apis';

export const SearchForm = forwardRef(({ setLoading, setLocations }, ref) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
	};

	const handleSearch = useCallback(
		async (e) => {
			e.preventDefault();
			setLoading(true);
			const data = await searchLocation(searchTerm);
			setLocations(data);
			setLoading(false);
		},
		[searchTerm]
	);

	return (
		<form onSubmit={handleSearch}>
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				ref={ref}
				placeholder="Enter a city name"
			/>
			<button type="submit">Search</button>
		</form>
	);
});
