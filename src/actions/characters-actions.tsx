import { charactersActions } from '../slices/characters-slice';
import {
	apiDataType,
	characterInfoType,
	locationsType,
} from '../types/tableTypes';

const API_LOCATION = 'https://rickandmortyapi.com/api/location/';
const API_EPISODE = 'https://rickandmortyapi.com/api/episode/';

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

	return episodeData.map((item: { name: string; url: string }) => ({
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

	return [
		...locationsData.map((item: { name: string; type: string }) => ({
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

export const getCharacters = () => {
	return async (dispatch: any) => {
		const apiLink = 'https://rickandmortyapi.com/api/character';
		const fetchData = async () => {
			const response = await fetch(apiLink);
			const data = await response.json();
			return data;
		};

		try {
			const data: apiDataType = await fetchData();
			const originsAndLocations: locationsType[] = await getOrigins(
				data.results
			);
			const episodes: { name: string; url: string }[] = await getEpisodes([
				...new Set(data.results.map((item) => item.episode).flat()),
			]);

			dispatch(
				charactersActions.changeCharacters(
					filterCharactersData(data, originsAndLocations, episodes)
				)
			);
		} catch (error) {
			console.log(error);
		}
	};
};
