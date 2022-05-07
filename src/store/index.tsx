import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from '../slices/characters-slice';
import loadingSlice from '../slices/lodaing-slice';
import tableRowSlice from '../slices/table-row-slice';

const store = configureStore({
	reducer: {
		characters: charactersSlice.reducer,
		tableRows: tableRowSlice.reducer,
		loading: loadingSlice.reducer,
	},
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
