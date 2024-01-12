import { Navigate } from "react-router-dom";
import useAppSelector from "./hooks/useAppSelector";
import { TokenType } from "./types/AuthType";

type RouteType = {
  redirectPath?: string;
  children: React.JSX.Element;
};
export const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}: RouteType) => {
  const token = useAppSelector((state) => state.credentialReducer.token);
  if (token && !token.accessToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
