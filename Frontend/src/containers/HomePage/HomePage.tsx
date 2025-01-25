import { Container } from "@mui/material";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.tsx";
import ItemsList from "../../components/ItemsList/ItemsList.tsx";

const HomePage = () => {
  return (
    <>
      <Container sx={{ display: "flex", mt: 4, gap: 5 }}>
        <CategoryMenu />
        <ItemsList />
      </Container>
    </>
  );
};

export default HomePage;
