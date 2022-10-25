import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rtkQueryErrorLogger } from "./errorLogger";
import { pokemonApi, todosApi } from "./service";
import { taskSlice } from "./slice";

const rootReducer = combineReducers({
	[pokemonApi.reducerPath]: pokemonApi.reducer,
	[todosApi.reducerPath]: todosApi.reducer,
	tasks: taskSlice.reducer,
});

const persistedReducer = persistReducer({ key: "root", whitelist: [], storage }, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
		pokemonApi.middleware,
		todosApi.middleware,
		rtkQueryErrorLogger,
	],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
