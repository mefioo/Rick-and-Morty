import { createSlice } from '@reduxjs/toolkit';
import { filtersType } from '../types/types';

const initalState: filtersType = {
	name: '',
	status: 'All',
	species: [],
	origins: [],
};

const filtersSlice = createSlice({
	name: 'link',
	initialState: initalState,
	reducers: {
		changeName(state, action) {
			state.name = action.payload.name;
		},
		changeStatus(state, action) {
			state.status = action.payload.status;
		},
		changeSpecies(state, action) {
			state.species = action.payload.species;
		},
		changeOrigins(state, action) {
			state.origins = action.payload.origins;
		}
	},
});

export default filtersSlice;
export const filtersActions = filtersSlice.actions;
