import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectCurrentItem,
  selectDeleteItemLoading,
  selectItemsLoading,
} from "../../store/slices/itemSlice.ts";
import { useEffect } from "react";
import { deleteItem, fetchItemById } from "../../store/thunks/itemThunk.ts";
import Loader from "../Loader/Loader.tsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { selectUser } from "../../store/slices/userSlice.ts";

const imageUrl = "http://localhost:8000";

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const item = useAppSelector(selectCurrentItem);
  const loading = useAppSelector(selectItemsLoading);
  const deleteItemLoading = useAppSelector(selectDeleteItemLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id]);

  const handleDelete = () => {
    if (item && item.seller._id === user?._id) {
      dispatch(deleteItem(item._id));
      navigate("/"); //
    }
  };

  if (loading) {
    return <Loader open={loading} />;
  }

  if (!item) {
    return (
      <Typography variant="h6" color="text.secondary" textAlign="center">
        Item not found
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
      <Card sx={{ maxWidth: 800, display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={imageUrl + item.image}
          alt={item.title}
          sx={{ height: 400, objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom={2}>
            {item.description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Category:</strong> {item.category.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Seller:</strong> {item.seller.displayName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Phone:</strong> {item.seller.phoneNumber}
          </Typography>
          <Divider sx={{ mb: 1, mt: 1 }} />
          <Typography
            variant="h5"
            component="div"
            color="primary"
            textAlign="center"
          >
            {item.price} KGZ
          </Typography>
        </CardContent>

        {user?._id === item.seller._id && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ margin: 2, alignSelf: "center" }}
            loading={deleteItemLoading}
            disabled={deleteItemLoading}
          >
            delete
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default ItemDetails;
