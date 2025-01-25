import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store.ts";
import { GlobalError, Item } from '../../typed';
import { createItem, deleteItem, fetchItemById, fetchItems, fetchItemsByCategory } from '../thunks/itemThunk.ts';

interface ItemsState {
  currentItem: Item | null;
  items: Item[];
  itemsLoading: boolean;
  createItemLoading: boolean;
  getItemError: GlobalError | null;
}

const initialState: ItemsState = {
  currentItem: null,
  items: [],
  itemsLoading: false,
  createItemLoading: false,
  getItemError:  null,
};

export const selectCurrentItem = (state: RootState) => state.items.currentItem;
export const selectItems = (state: RootState) => state.items.items;
export const selectItemsLoading = (state: RootState) => state.items.itemsLoading;
export const selectCreateItemLoading = (state: RootState) => state.items.createItemLoading;

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
    builder.addCase(fetchItemsByCategory.pending, (state) => {
      state.itemsLoading = true;
    });
    builder.addCase(fetchItemsByCategory.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.itemsLoading = false;
        state.items = action.payload;
      },
    );
    builder.addCase(fetchItemsByCategory.rejected, (state) => {
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
      state.createItemLoading = true;
    });
    builder.addCase(createItem.fulfilled, (state) => {
        state.createItemLoading = false;
      },
    );
    builder.addCase(createItem.rejected, (state) => {
      state.createItemLoading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;
