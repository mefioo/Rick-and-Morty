import { configureStore } from '@reduxjs/toolkit';
import apiInfoSlice from '../slices/api-info-slice';
import errorSlice from '../slices/error-slice';
import filtersSlice from '../slices/filters-slice';
import loadingSlice from '../slices/lodaing-slice';
import tableSlice from '../slices/table-slice';

const store = configureStore({
	reducer: {
		apiInfo: apiInfoSlice.reducer,
		table: tableSlice.reducer,
		loading: loadingSlice.reducer,
		filters: filtersSlice.reducer,
		error: errorSlice.reducer,
	},
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
