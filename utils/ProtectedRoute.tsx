import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import { logoutUser } from "@/slices/authSlice";
import { parseTokenExpiration } from "./utility";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useAppSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, redirect to home page
      router.push("/");
      return; // Stop further execution of the code
    }

    // Check if the token has expired
    if (token) {
      const tokenExpiration = parseTokenExpiration(token);
      const currentTimeStamp = new Date().getTime();
      if (tokenExpiration && currentTimeStamp > tokenExpiration) {
        // Token has expired, log out the user and redirect to home page
        dispatch(logoutUser()); // Dispatch the logout action to clear the token
        router.push("/");
      }
    }
  }, [isAuthenticated, token, router, dispatch]);

  return <>{children}</>;
};

export default ProtectedRoute;
