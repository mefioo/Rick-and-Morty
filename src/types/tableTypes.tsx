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
	episode: string[];
	id: number;
	name: string;
	image: string;
	location: {
		name: string;
		url: string;
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
		count: number;
		next: string;
		pages: number;
		prev: null;
	};
	results: necessaryCharacterInfoType[];
};
