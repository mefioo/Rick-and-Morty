import { createSlice } from '@reduxjs/toolkit';

type rowType = {
	rows: {
		id: number;
		isChecked: boolean;
	}[];
};

const initialState: rowType = {
	rows: [],
};

const tableRowSlice = createSlice({
	name: 'tableRow',
	initialState,
	reducers: {
		updateRows(state, action) {
			state.rows = action.payload.rows;
		},
	},
});

export default tableRowSlice;
export const tableRowActions = tableRowSlice.actions;