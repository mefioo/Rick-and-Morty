import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: { isLoading: false },
	reducers: {
		setIsLoading(state, action) {
			state.isLoading = action.payload.isLoading;
		},
	},
});

export default loadingSlice;
export const loadingActions = loadingSlice.actions;
