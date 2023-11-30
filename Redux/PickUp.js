import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const PickUp = createSlice({
    name: 'PickUp',
    initialState: {
        PickUpDate : "",
        PickUpTime:"",
        DeliveryTime:""
    },
    reducers: {
        PickUpTimeDate: (state, action) => {
            state.PickUpDate = action.payload.selectDeliveryTime;
            state.PickUpTime = action.payload.selectTime;
            state.DeliveryTime = action.payload.selectedDate;
            
        },
        clearPickUp:(state, action) => {
            state.PickUpDate = "";
            state.PickUpTime = "";
            state.DeliveryTime = "";
        }
    }
})

export const { PickUpTimeDate,clearPickUp } = PickUp.actions
export default PickUp.reducer