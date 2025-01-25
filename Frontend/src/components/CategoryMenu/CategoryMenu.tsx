import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCategories } from "../../store/slices/categorySlice.ts";
import { useEffect } from "react";
import { fetchCategories } from "../../store/thunks/categoryThunk.ts";
import { fetchItemsByCategory } from "../../store/thunks/itemThunk.ts";
import { Category } from "../../typed";

const CategoryMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category: Category) => {
    dispatch(fetchItemsByCategory(category._id));
    navigate(`/category/${category.title}`);
  };

  return (
    <Box sx={{ width: 250, flexShrink: 0 }}>
      {categories.map((category) => (
        <Button
          key={category._id}
          variant="contained"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => handleCategoryClick(category)}
        >
          {category.title}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryMenu;
