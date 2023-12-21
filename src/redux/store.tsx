import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import characterReducer from "./Character/CharacterSlice"

// Root state type
export type CharacterState = ReturnType<typeof characterReducer>;

// Thunk action type
export type AppThunk = ThunkAction<void, CharacterState, null, Action<string>>;


const store = configureStore({
    reducer: {
        character: characterReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;