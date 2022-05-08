import { createSlice } from '@reduxjs/toolkit';

const noErrorState = {
	isError: false,
	errorData: { title: 'Error', code: 0, message: 'Somethink went wrong' },
};

const errorSlice = createSlice({
	name: 'error',
	initialState: noErrorState,
	reducers: {
		clearError(state) {
			state.isError = false;
			state.errorData = { title: '', code: 0, message: '' };
		},
		setError(
			state,
			action: { payload: { title: string; code: number; message: string } }
		) {
			state.isError = true;
			state.errorData = action.payload;
		},
	},
});

export default errorSlice;
export const errorActions = errorSlice.actions;
