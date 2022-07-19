import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import ProtectedRouted from "./Pages/ProtectedRouted";
import ForgotPassword from "./Pages/ForgotPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<ProtectedRouted />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
