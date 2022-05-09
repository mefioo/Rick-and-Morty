export type characterInfoType = {
	created: string;
	episode: string[];
	gender: string;
	id: number;
	image: string;
	location: {
		name: string;
		url: string;
	};
	name: string;
	origin: {
		name: string;
		url: string;
	};
	species: string;
	status: string;
	type: string;
	url: string;
};

export type apiDataType = {
	info: {
		count: number;
		next: string;
		pages: number;
		prev: null | string;
	};
	results: characterInfoType[];
};

export type necessaryCharacterInfoType = {
	episode: { name: string; url: string }[];
	id: number;
	name: string;
	image: string;
	location: {
		name: string;
		url: string;
		type: string;
	};
	origin: {
		name: string;
		url: string;
		type: string;
	};
	status: string;
	species: string;
};

export type necessaryApiDataType = {
	info: {
		charactersNo: number;
		locationsNo: number;
		episodesNo: number;
	};
	characters: necessaryCharacterInfoType[];
	locations: { id: number; name: string; type: string }[];
	pages: number;
};

export type locationsType = {
	name: string;
	type: string;
};

export type singleCharacterType = {
	created: string;
	episode: string[];
	gender: string;
	id: number;
	image: string;
	location: { name: string; url: string };
	name: string;
	origin: { name: string; url: string };
	species: string;
	status: string;
	type: string;
	url: string;
};

export type singleLocationType = {
	created: string;
	dimension: string;
	id: number;
	name: string;
	residents: string[];
	type: string;
	url: string;
};

export type singleEpisodeType = {
	air_date: string;
	characters: string[];
	created: string;
	episode: string;
	id: number;
	name: string;
	url: string;
};

export type filterType = {
	id: number;
	name: string;
};

export type filtersType = {
	name: string;
	status: string;
	species: filterType[];
	origins: filterType[];
};
