import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { Category } from "../../typed";

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetchCategories",
  async () => {
    const response = await axiosAPI.get("/categories");
    return response.data || [];
  },
);
