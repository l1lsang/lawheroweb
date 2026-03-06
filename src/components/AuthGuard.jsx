import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function AuthGuard({ children }) {

  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children ? children : <Outlet />;
}