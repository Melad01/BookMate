import { createBrowserRouter } from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";
import BooksPage from "./pages/BooksPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import UserDetailPage from "./pages/UserDetailPage";
import UsersPage from "./pages/UsersPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "books", element: <BooksPage /> },
          { path: "books/:title", element: <BookDetailsPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "users/:id", element: <UserDetailPage /> },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);

export default router;
