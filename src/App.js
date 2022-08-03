import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import ProtectedRouted from "./Pages/ProtectedRouted";
import ForgotPassword from "./Pages/ForgotPassword";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SellItem from "./Pages/SellItem";
import CategoryPage from "./Pages/CategoryPage";
import Wishlist from "./Pages/Wishlist";
import Productpage from "./Pages/Productpage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sell-item" element={<SellItem />} />
        <Route path="/wish-list" element={<Wishlist />} />
        <Route path="/category/:categoryType" element={<CategoryPage />} />
        <Route
          path="/category/:categoryType/:productId"
          element={<Productpage />}
        />
        <Route path="/profile" element={<ProtectedRouted />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
