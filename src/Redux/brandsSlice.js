import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getErrorMessage } from "../Api/api";

let initialState = { brands: [], isLoading: false, error: null };

export let getBrands = createAsyncThunk(
  "brands/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/brands`);
      return data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

let brandsSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.error = action.payload ?? "Couldn't load brands";
      state.isLoading = false;
    });
  },
});
export let brandsReducer = brandsSlice.reducer;
