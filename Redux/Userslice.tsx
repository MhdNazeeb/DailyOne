import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const Userslice = createSlice({
    name: 'user',
    initialState: {
       user : null
    },
    reducers: {
        Login: (state, action) => {
            state.user = action.payload;
        },
        Logout:(state, action) => {
            state.user = {
                user : null
            }
        }
    }
})

export const { Login } = Userslice.actions
export default Userslice.reducer