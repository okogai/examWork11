import { Route, Routes } from "react-router-dom";
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import RegisterPage from "./components/RegisterPage/RegisterPage.tsx";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import HomePage from "./containers/HomePage/HomePage.tsx";
import ItemForm from "./components/ItemForm/ItemForm.tsx";
import ItemDetails from "./components/ItemDetails/ItemDetails.tsx";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:id" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-item" element={<ItemForm />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
