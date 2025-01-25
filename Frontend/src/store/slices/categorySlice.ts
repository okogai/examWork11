import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../typed';
import { RootState } from '../../app/store.ts';
import { fetchCategories } from '../thunks/categoryThunk.ts';

interface CategoryState {
  categories: Category[];
  categoriesLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  categoriesLoading: false
};

export const selectCategories = (state: RootState) => state.categories.categories;
export const categoriesLoading =  (state: RootState) => state.categories.categoriesLoading;

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled,(state, action: PayloadAction<Category[]>) => {
      state.categoriesLoading = false;
      state.categories = action.payload;
      },
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoriesLoading = false;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
