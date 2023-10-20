import {configureStore} from "@reduxjs/toolkit";
import favouriteRecipeSlice from './favouriteRecipe'

const store = configureStore({
    reducer: {
        favourites: favouriteRecipeSlice,
    }
})

export default store;