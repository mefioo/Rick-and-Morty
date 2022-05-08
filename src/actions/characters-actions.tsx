import { API_EPISODE, API_LOCATION } from '../constants';
import { charactersActions } from '../slices/characters-slice';
import { errorActions } from '../slices/error-slice';
import { tableRowActions } from '../slices/table-row-slice';
import {
	apiDataType,
	characterInfoType,
	locationsType,
} from '../types/tableTypes';

const createSetOfNumbersFromStrings = (array: string[]) => {
	return [
		...new Set(
			array
				.map((item) => item.slice(item.lastIndexOf('/') + 1))
				.filter((item) => item !== '')
		),
	].join(',');
};

const getTwoRandomArrayElements = (array: string[]) => {
	return array.sort(() => 0.5 - Math.random()).slice(0, 2);
};

const getEpisodes = async (data: string[]) => {
	const episodeNumbers = createSetOfNumbersFromStrings(data);

	const response = await fetch(API_EPISODE + episodeNumbers);
	const episodeData = await response.json();

	const arrayEpisodeData = Array.isArray(episodeData)
		? episodeData
		: [episodeData];

	return arrayEpisodeData.map((item: { name: string; url: string }) => ({
		name: item.name,
		url: item.url,
	}));
};

const getOrigins = async (data: characterInfoType[]) => {
	const originsAndLocations = [
		...data.map((item) => item.origin),
		...data.map((item) => item.location),
	];

	const locations = createSetOfNumbersFromStrings(
		originsAndLocations.map((item) => item.url)
	);

	const response = await fetch(API_LOCATION + locations);
	const locationsData = await response.json();

	const arrayLocationsData = Array.isArray(locationsData)
		? locationsData
		: [locationsData];

	return [
		...arrayLocationsData.map((item: { name: string; type: string }) => ({
			name: item.name,
			type: item.type,
		})),
		{ name: 'unknown', type: '' },
	];
};

const filterCharactersData = (
	data: apiDataType,
	origins: { name: string; type: string }[],
	episodes: { name: string; url: string }[]
) => {
	const charactersInfo = data.results.map((item) => ({
		id: item.id,
		name: item.name,
		image: item.image,
		origin: {
			name: item.origin.name,
			url: item.origin.url,
			type: origins.find((origin) => origin.name === item.origin.name)?.type,
		},
		location: {
			name: item.location.name,
			url: item.location.url,
			type: origins.find((origin) => origin.name === item.location.name)?.type,
		},
		episode: (item.episode.length > 2
			? getTwoRandomArrayElements(item.episode)
			: item.episode
		).map((episode) => episodes.find((item) => item.url === episode)),
		status: item.status,
		species: item.species,
	}));

	return { info: data.info, results: charactersInfo };
};

const fetchData = async (apiLink: string) => {
	const response = await fetch(apiLink);
	const data = await response.json();
	return data;
};

export const updateCharacters = (
	apiLink: string,
	pageNumber: number,
	type: string
) => {
	return async (dispatch: any) => {
		try {
			const data: apiDataType = await fetchData(apiLink);
			if (Object.keys(data).includes('error')) {
				if (type === 'ADD') {
					dispatch(charactersActions.addCharacters({ info: {}, results: [] }));
				}
				if (type === 'SET') {
					dispatch(charactersActions.setCharacters({ info: {}, results: [] }));
				}
				return;
			}

			const originsAndLocations: locationsType[] = await getOrigins(
				data.results
			);
			const episodes: { name: string; url: string }[] = await getEpisodes([
				...new Set(data.results.map((item) => item.episode).flat()),
			]);

			const dataToDispatch = {
				...filterCharactersData(data, originsAndLocations, episodes),
				currentPage: pageNumber,
			};
			if (type === 'ADD') {
				dispatch(charactersActions.addCharacters(dataToDispatch));
			}
			if (type === 'SET') {
				dispatch(charactersActions.setCharacters(dataToDispatch));
			}

			dispatch(
				tableRowActions.updateRows({
					rows: dataToDispatch.results
						.slice(0, 5)
						.map((item) => ({
							id: item.id,
							isChecked: false,
							status: item.status,
						})),
				})
			);
		} catch (error) {
			dispatch(
				errorActions.setError({
					title: 'Error while fetching data',
					code: 0,
					message: String(error),
				})
			);
		}
	};
};
