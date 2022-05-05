import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from '../slices/characters-slice';

const store = configureStore({
	reducer: { characters: charactersSlice.reducer },
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;
