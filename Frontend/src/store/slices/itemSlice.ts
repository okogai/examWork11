import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store.ts";
import { GlobalError, Item } from '../../typed';
import { createItem, deleteItem, fetchItemById, fetchItems } from '../thunks/itemThunk.ts';

interface ItemsState {
  currentItem: Item | null;
  items: Item[];
  itemsLoading: boolean;
  getItemError: GlobalError | null;
}

const initialState: ItemsState = {
  currentItem: null,
  items: [],
  itemsLoading: false,
  getItemError:  null,

};

export const selectCurrentItem = (state: RootState) => state.items.currentItem;
export const selectItems = (state: RootState) => state.items.items;
export const selectItemsLoading = (state: RootState) => state.items.itemsLoading;

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.itemsLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.itemsLoading = false;
        state.items = action.payload;
      },
    );
    builder.addCase(fetchItems.rejected, (state) => {
      state.itemsLoading = false;
    });
    builder.addCase(fetchItemById.pending, (state) => {
      state.itemsLoading = true;
      state.getItemError = null;
    });
    builder.addCase(fetchItemById.fulfilled, (state, action: PayloadAction<Item>) => {
        state.itemsLoading = false;
        state.currentItem = action.payload;
      state.getItemError = null;
      },
    );
    builder.addCase(fetchItemById.rejected, (state, { payload: error }) => {
      state.itemsLoading = false;
      state.getItemError = error || null;
    });
    builder.addCase(deleteItem.pending, (state) => {
      state.itemsLoading = true;
      state.getItemError = null;
    });
    builder.addCase(deleteItem.fulfilled, (state) => {
        state.itemsLoading = false;
        state.currentItem = null;
        state.getItemError = null;
      },
    );
    builder.addCase(deleteItem.rejected, (state, { payload: error }) => {
      state.itemsLoading = false;
      state.getItemError = error || null;
    });
    builder.addCase(createItem.pending, (state) => {
      state.itemsLoading = true;
    });
    builder.addCase(createItem.fulfilled, (state) => {
        state.itemsLoading = false;
      },
    );
    builder.addCase(createItem.rejected, (state) => {
      state.itemsLoading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;
