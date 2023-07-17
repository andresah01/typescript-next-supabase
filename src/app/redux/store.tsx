import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";
import clientInfoSlice from "./clientInfoSlice";

const store = configureStore({
    reducer: {
        newClient: clientSlice,
        infoClient: clientInfoSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store