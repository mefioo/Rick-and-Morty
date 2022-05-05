import { createSlice } from '@reduxjs/toolkit';
import { necessaryApiDataType } from '../types/tableTypes';

const initialState: necessaryApiDataType = {
	info: { count: 0, next: '', pages: 0, prev: null },
	results: [],
};

const characterSlice = createSlice({
	name: 'characters',
	initialState: initialState,
	reducers: {
		changeCharacters(state, action) {
			state.info = action.payload.info;
			state.results = action.payload.results;
		},
	},
});

export default characterSlice;
export const charactersActions = characterSlice.actions;
