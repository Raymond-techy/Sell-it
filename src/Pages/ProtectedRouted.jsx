import { Outlet, Navigate } from "react-router-dom";
import { UseAuthStatus } from "../Components/UseAuthStatus";
function ProtectedRouted() {
  const { loggedIn, checkingStatus } = UseAuthStatus();
  if (checkingStatus) {
    return <h3>Loading</h3>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRouted;
