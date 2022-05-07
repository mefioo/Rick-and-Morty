import { createSlice } from '@reduxjs/toolkit';
import { necessaryApiDataType } from '../types/tableTypes';

const initialState: necessaryApiDataType = {
	info: { count: 0, next: '', pages: 0, prev: null },
	results: [],
	currentPage: 1,
};

const characterSlice = createSlice({
	name: 'characters',
	initialState: initialState,
	reducers: {
		setCharacters(state, action) {
			state.info = action.payload.info;
			state.results = action.payload.results;
			state.currentPage = action.payload.currentPage;
		},
		addCharacters(state, action) {
			state.info = {
				count: action.payload.info.count,
				next: action.payload.info.next,
				pages: action.payload.info.pages,
				prev: action.payload.info.prev,
			};
			state.results = state.results.concat(action.payload.results);
			state.currentPage = action.payload.currentPage;
		},
		updatePageNumber(state, action) {
			state.currentPage = action.payload.currentPage;
		},
	},
});

export default characterSlice;
export const charactersActions = characterSlice.actions;
