import { configureStore } from "@reduxjs/toolkit";
//* reducers
import pokemons from "./slices/pokemons";
import ui from "./slices/ui";

export const store = configureStore({
  reducer: {
    pokemons,
    ui,
  },
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;