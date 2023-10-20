import { createSlice } from "@reduxjs/toolkit";

const favouriteRecipeSlice = createSlice({
    name: "favourites",
    initialState: {
        item: [],
    },

    reducers:{
        addItem: (state, action)=>{
            state.item.push(favouriteRecipeSlice)
        }
    }
})

export const {addItem } = favouriteRecipeSlice.actions;
export default favouriteRecipeSlice;