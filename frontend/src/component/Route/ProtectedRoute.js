import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false && loading === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, loading]);
  return children;
}
export default ProtectedRoute;
