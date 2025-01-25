import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectItems,
  selectItemsLoading,
} from "../../store/slices/itemSlice.ts";
import { fetchItems } from "../../store/thunks/itemThunk.ts";
import { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Loader from "../Loader/Loader.tsx";
import { useLocation, useNavigate } from "react-router-dom";

const imageUrl = "http://localhost:8000";

const ItemsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectItemsLoading);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(fetchItems());
    }
  }, [dispatch, location.pathname]);

  const handleCardClick = (itemId: string) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <Grid container spacing={4}>
      {loading ? (
        <Loader open={loading} />
      ) : (
        <>
          {items.length === 0 && !loading ? (
            <Typography variant="h1">No items yet</Typography>
          ) : (
            <>
              {items.map((item) => (
                <Grid size={6} key={item._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => handleCardClick(item._id)}
                  >
                    <CardMedia
                      component="img"
                      image={imageUrl + item.image}
                      alt={item.title}
                      sx={{ height: 200, objectFit: "contain" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {item.price} KGZ
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </>
      )}
    </Grid>
  );
};

export default ItemsList;
