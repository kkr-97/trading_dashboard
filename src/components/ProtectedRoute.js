import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const token = Cookie.get("trading_token");

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  return token ? props.children : null;
};

export default ProtectedRoute;
