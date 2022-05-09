import { createSlice } from '@reduxjs/toolkit';

type tableSliceType = {
	rows: {
		id: number;
		isChecked: boolean;
		status: string;
	}[];
	allChecked: boolean;
	currentPage: number;
};

const initialState: tableSliceType = {
	rows: [],
	allChecked: false,
	currentPage: 1,
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		updateAll(state, action) {
			state.rows = action.payload.rows;
			state.allChecked = !state.allChecked;
		},
		updatePageNumber(state, action) {
			state.currentPage = action.payload.currentPage;
		},
		updateRows(state, action) {
			state.rows = action.payload.rows;
			state.allChecked = false;
			state.currentPage =
				state.currentPage === 0 || state.currentPage === 1
					? 1
					: state.currentPage <= Math.ceil(action.payload.rows.length / 5)
					? state.currentPage
					: Math.ceil(action.payload.rows.length / 5);
		},
		unselectAllRows(state) {
			state.rows = state.rows.map((item) => ({ ...item, isChecked: false }));
			state.allChecked = false;
		},
	},
});

export default tableSlice;
export const tableActions = tableSlice.actions;
