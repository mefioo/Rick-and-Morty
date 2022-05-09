import { createSlice } from '@reduxjs/toolkit';
import { necessaryApiDataType } from '../types/types';

const initialState: necessaryApiDataType = {
	info: { charactersNo: 0, locationsNo: 0, episodesNo: 0 },
	characters: [],
	locations: [],
	pages: 0,
};

const apiInfoSlice = createSlice({
	name: 'apiInfo',
	initialState: initialState,
	reducers: {
		setApiInfo(state, action) {
			state.info = action.payload.info;
			state.characters = action.payload.characters;
			state.locations = action.payload.locations;
			state.pages = action.payload.pages;
		},
	},
});

export default apiInfoSlice;
export const apiInfoActions = apiInfoSlice.actions;
