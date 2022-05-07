import { createSlice } from '@reduxjs/toolkit';
import { API_CHARACTERS } from '../constants';

const linkSlice = createSlice({
	name: 'link',
	initialState: { apiLink: API_CHARACTERS, name: '', status: 'All' },
	reducers: {
		changeName(state, action) {
			state.name = action.payload.name;
		},
		changeStatus(state, action) {
			state.status = action.payload.status;
		},
		clearLink(state) {
			state.apiLink = API_CHARACTERS;
		},
	},
});

export default linkSlice;
export const linkActions = linkSlice.actions;
