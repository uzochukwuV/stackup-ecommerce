import Login from "./pages/auth/Login";

import { useAppSelector } from "./store";

import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "./pages/404";
import Register from "./pages/auth/Register";
import { CreateProduct } from "./pages/product/CreateProduct";
import { ProductDashboard } from "./pages/product/ProductDashboard";

import { Products } from "./pages/product/Products";
import "./App.css";
import type { AuthState, UserResponse } from "./services/auth/types";
import { Cart } from "./pages/product/Cart";
import Dashboard from "./pages/admin/dashboard";

const App = () => {
  let authState: AuthState = {
    user: null,
    token: null,
  };
  const { user, token } = useAppSelector((state) => state.auth);
  const userSession = sessionStorage.getItem("user");
  const response: UserResponse = userSession ? JSON.parse(userSession) : null;
  if (
    sessionStorage.getItem("isAuthenticated") === "true" &&
    response !== null
  ) {
    authState = {
      user:
        {
          username: response.username,
          id: response.userId,
          email: response.email,
          role: response.role,
        } ?? user,
      token: response.token ?? token,
    };
  }
  const isAuthenticated = authState.user !== null && authState.token !== null;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Login authState={authState} isAuthenticated={isAuthenticated} />
      ),
    },
    {
      path: "register",
      element: <Register isAuthenticated={isAuthenticated} />,
    },
    {
      path: "admin/dashboard/",
      element: (
        <Dashboard isAuthenticated={isAuthenticated} authState={authState} />
      ),
    },
    {
      path: "/dashboard/",
      element: (
        <ProductDashboard
          isAuthenticated={isAuthenticated}
          authState={authState}
        />
      ),
      children: [
        {
          path: "",
          element: (
            <div>
              <Products />
            </div>
          ),
        },
        {
          path: "create/:sellerId",
          element: (
            <CreateProduct
              isAuthenticated={isAuthenticated}
              authState={authState}
            />
          ),
        },
        {
          path: "cart",
          element: (
            <Cart isAuthenticated={isAuthenticated} authState={authState} />
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
