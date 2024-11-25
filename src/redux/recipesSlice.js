import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (params) => {
  const { limit, skip, cuisine } = params;
  const query = cuisine ? `&cuisine=${cuisine}` : '';
  const response = await axios.get(
    `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}${query}`
  );
  return response.data;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    data: [],
    total: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.recipes;
        state.total = action.payload.total;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
