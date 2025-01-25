import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { createItem } from "../../store/thunks/itemThunk.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { selectUser } from "../../store/slices/userSlice.ts";
import FileInput from "../UI/FileInput/FileInput.tsx";
import { fetchCategories } from "../../store/thunks/categoryThunk.ts";
import { selectCategories } from "../../store/slices/categorySlice.ts";
import { selectCreateItemLoading } from "../../store/slices/itemSlice.ts";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  image: null,
};

const ItemForm = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCreateItemLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [filename, setFilename] = useState("");
  const [form, setForm] = useState(initialState);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setFilename(files[0].name);
    }
  };

  const handleChange = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please select an image.");
      return;
    }

    await dispatch(createItem(form));
    navigate("/");
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          You need to be logged in to add an item.
        </Typography>
        <Link to="/login" underline="hover" component={NavLink}>
          Go to Login
        </Link>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Add New Item
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
        required
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        required
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FileInput
        label="Image"
        name="image"
        filename={filename}
        onChange={fileInputChangeHandler}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
      >
        Add Item
      </Button>
    </Box>
  );
};

export default ItemForm;
