import { createSlice } from '@reduxjs/toolkit'

interface uiStateType {
    isDarkMode: boolean
}

const initialState: uiStateType = {
    isDarkMode: true
}

//* Nuestro Slice 
export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toogleMode: (state) => {
                state.isDarkMode = !state.isDarkMode
        },
    }
})

//* exportamos las actions de nuestro slice
export const { toogleMode } = uiSlice.actions

//* exportamos el reducer
export default uiSlice.reducer

