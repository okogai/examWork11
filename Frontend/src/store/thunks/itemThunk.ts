import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { DeleteItemResponse, GlobalError, Item, ItemMutation } from '../../typed';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';

export const fetchItems = createAsyncThunk<Item[], { category?: string }>(
  "items/fetchItems",
  async ({ category }) => {
    const response = await axiosAPI.get('/items', { params: { category } });
    return response.data || [];
  }
);

export const fetchItemById = createAsyncThunk<Item, string, { rejectValue: GlobalError }>(
  "items/fetchItemById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`/items/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const createItem = createAsyncThunk<void, ItemMutation, { state: RootState }>(
  "items/createItem",
  async (item: ItemMutation,  { getState }) => {

    const token = getState().users.user?.token;

    const formData = new FormData();
    formData.append('title', item.title);
    formData.append('description', item.description);
    formData.append('price', item.price.toString());
    formData.append('category', item.category);
    if (item.image) {
      formData.append('image', item.image);
    }

    const response = await axiosAPI.post('/items', formData, {
      headers: { Authorization: token }
    });

    return response.data;
  }
);

export const deleteItem = createAsyncThunk<DeleteItemResponse, string, { rejectValue: GlobalError }>(
  "items/deleteItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.delete<DeleteItemResponse>(`/items/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

