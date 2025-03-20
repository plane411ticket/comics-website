import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./screens/Home/HomePage";
import Profiles from "./screens/Auth/ListProfiles";
import Error from "./screens/Error";
import UserProfilePage from "./screens/Auth/ProfileScreen";
import MangaList from "./screens/Manga/MangaList";
import NovelList from "./screens/Novel/NovelList";
import Forum from "./screens/Forum/Forum";
import Genre from "./screens/Genre/Genre";
import Leaderboard from "./screens/Leaderboard/Leaderboard";
import AdvanceSearch from "./screens/Search/Avsearch";
import AuthRoutes from "./router/AuthRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Đặt App làm layout chính
    errorElement: <Error />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/profiles", element: <Profiles /> },
      { path: "/profiles/:userId", element: <UserProfilePage /> },
      { path: "/manga", element: <MangaList /> },
      { path: "/novellist", element: <NovelList /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/forum", element: <Forum /> },
      { path: "/genre", element: <Genre /> },
      { path: "/avsearch", element: <AdvanceSearch /> },
      { path: "/auth/*", element: <AuthRoutes /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
