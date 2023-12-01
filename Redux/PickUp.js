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
            console.log(action,'jjj');
            state.PickUpDate = action.payload.selectedDate;
            state.PickUpTime = action.payload.selectTime;
            state.DeliveryTime = action.payload.selectDeliveryTime;
            
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