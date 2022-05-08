import { createSlice } from '@reduxjs/toolkit';

type rowType = {
	rows: {
		id: number;
		isChecked: boolean;
		status: string
	}[];
	allChecked: boolean;
};

const initialState: rowType = {
	rows: [],
	allChecked: false,
};

const tableRowSlice = createSlice({
	name: 'tableRow',
	initialState,
	reducers: {
		updateRows(state, action) {
			state.rows = action.payload.rows;
		},
		updateAll(state, action) {
			state.rows = action.payload.rows;
			state.allChecked = !state.allChecked;
		},
	},
});

export default tableRowSlice;
export const tableRowActions = tableRowSlice.actions;
