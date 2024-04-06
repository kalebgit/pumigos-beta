import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {loggedIn: false, email: undefined}
const authSlice = createSlice({
    name: 'auth', 
    initialState: initialState,
    reducers: {
        login(state, payload){
            state.loggedIn = true
            state.email = payload
        },
        logout(state){
            state = initialState
        }
    }
})

export const actions = authSlice.actions
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})