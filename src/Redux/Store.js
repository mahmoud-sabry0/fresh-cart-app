import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlide";
import { brandsReducer } from "./brandsSlice";




export let store = configureStore({
    reducer:{
        counter:CounterReducer,
        brand: brandsReducer
    }
})