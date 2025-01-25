import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { GlobalError, Item, ItemById, ItemMutation } from "../../typed";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const fetchItems = createAsyncThunk<Item[], void>(
  "items/fetchItems",
  async () => {
    const response = await axiosAPI.get("/items");
    return response.data || [];
  },
);

export const fetchItemsByCategory = createAsyncThunk<Item[], string>(
  "items/fetchItemsByCategory",
  async (id: string) => {
    const response = await axiosAPI.get(`/items?category=${id}`);
    return response.data || [];
  },
);

export const fetchItemById = createAsyncThunk<
  ItemById,
  string,
  { rejectValue: GlobalError }
>("items/fetchItemById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axiosAPI.get(`/items/${id}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const createItem = createAsyncThunk<
  void,
  ItemMutation,
  { state: RootState }
>("items/createItem", async (item: ItemMutation, { getState }) => {
  const token = getState().users.user?.token;

  const formData = new FormData();
  formData.append("title", item.title);
  formData.append("description", item.description);
  formData.append("price", item.price.toString());
  formData.append("category", item.category);
  if (item.image) {
    formData.append("image", item.image);
  }

  const response = await axiosAPI.post("/items", formData, {
    headers: { Authorization: token },
  });

  return response.data;
});

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  "items/deleteItem",
  async (id: string, { getState }) => {
    const token = getState().users.user?.token;
    await axiosAPI.delete(`items/${id}`, {
      headers: { Authorization: token },
    });
  },
);
