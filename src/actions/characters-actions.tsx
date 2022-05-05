import { charactersActions } from '../slices/characters-slice';
import { apiDataType } from '../types/tableTypes';

const filerCharactersData = (data: apiDataType) => {
	const charactersInfo = data.results.map((item) => ({
		id: item.id,
		name: item.name,
		image: item.image,
		origin: item.origin,
		location: item.location,
		episode: item.episode,
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
			const data = await fetchData();

			dispatch(charactersActions.changeCharacters(filerCharactersData(data)));
		} catch (error) {
			console.log(error);
		}
	};
};
