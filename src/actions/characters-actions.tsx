import { charactersActions } from '../slices/characters-slice';
import { apiDataType, characterInfoType } from '../types/tableTypes';

const getOrigins = async (data: characterInfoType[]) => {
	const originsAndLocations = [
		...data.map((item) => item.origin),
		...data.map((item) => item.location),
	];

	const originsAndLocationsSet = [
		...new Map(
			originsAndLocations.map((item) => [item['name'], item])
		).values(),
	].filter((item) => item.url !== '');

	let responses: { id: number; name: string; type: string }[] = [];

	await Promise.all(
		originsAndLocationsSet.map(async (origin) => {
			const data = await fetch(origin.url);
			responses.push(await data.json());
		})
	);
	return [
		...responses.map((item) => ({ name: item.name, type: item.type })),
		{ name: 'unknown', type: '' },
	];
};

const filterCharactersData = (
	data: apiDataType,
	origins: { name: string; type: string }[]
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
			const data: apiDataType = await fetchData();
			const originsAndLocations = await getOrigins(data.results);

			dispatch(
				charactersActions.changeCharacters(
					filterCharactersData(data, originsAndLocations)
				)
			);
		} catch (error) {
			console.log(error);
		}
	};
};
