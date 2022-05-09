import { API_CHARACTERS, API_EPISODE, API_LOCATION } from '../constants';
import { apiInfoActions } from '../slices/api-info-slice';
import { errorActions } from '../slices/error-slice';
import {
	singleLocationType,
	singleEpisodeType,
	singleCharacterType,
} from '../types/types';
import { loadingActions } from '../slices/lodaing-slice';

const getTwoRandomArrayElements = (array: string[]) => {
	return array.sort(() => 0.5 - Math.random()).slice(0, 2);
};

const filterCharactersData = (
	characters: singleCharacterType[],
	locations: { id: number; name: string; type: string }[],
	episodes: { id: number; name: string; url: string }[]
) => {
	const charactersInfo = characters.map((character) => ({
		id: character.id,
		name: character.name,
		image: character.image,
		origin: locations.find(
			(location) => location.name === character.origin.name
		) || { name: 'unknown' },
		location: locations.find(
			(location) => location.name === character.location.name
		) || { name: 'unknown' },
		episode: (character.episode.length > 2
			? getTwoRandomArrayElements(character.episode)
			: character.episode
		).map((episode) => episodes.find((item) => item.url === episode)),
		status: character.status,
		species: character.species,
	}));

	return { characters: charactersInfo };
};

export const fetchData = async (apiLink: string) => {
	const response = await fetch(apiLink);
	const data = await response.json();
	return data;
};

export const getAllCharacters = () => {
	return async (dispatch: any) => {
		try {
			dispatch(loadingActions.setIsLoading({ isLoading: true }));
			const charactersList = [...new Array(826).keys()]
				.map((item) => item + 1)
				.join(',');
			const locationsList = [...new Array(126).keys()]
				.map((item) => item + 1)
				.join(',');
			const episodesList = [...new Array(126).keys()]
				.map((item) => item + 1)
				.join(',');

			const characters = await fetchData(API_CHARACTERS + charactersList);
			const locations = await fetchData(API_LOCATION + locationsList);
			const episodes = await fetchData(API_EPISODE + episodesList);

			const locationsToFilter = locations.map((item: singleLocationType) => ({
				id: item.id,
				name: item.name,
				type: item.type,
			}));
			const episodesToFilter = episodes.map((item: singleEpisodeType) => ({
				id: item.id,
				name: item.name,
				url: item.url,
			}));

			const dataToDispatch = {
				info: {
					charactersNo: characters.length,
					locationsNo: locations.length + 1,
					episodesNo: episodes.length,
				},
				...filterCharactersData(
					characters,
					locationsToFilter,
					episodesToFilter
				),
				locations: locationsToFilter.concat([
					{ id: locationsToFilter.length + 1, name: 'unknown', type: '' },
				]),
				pages: Math.ceil(characters.length / 5),
			};

			dispatch(apiInfoActions.setApiInfo(dataToDispatch));
			dispatch(loadingActions.setIsLoading({ isLoading: false }));
		} catch (error) {
			dispatch(loadingActions.setIsLoading({ isLoading: false }));
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
