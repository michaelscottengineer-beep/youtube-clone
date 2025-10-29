import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./pages/Root.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import SearchPage from "./pages/search/SearchPage.tsx";
import WatchPage from "./pages/watch/WatchPage.tsx";
import searchLoader from "./pages/search/searchLoader.ts";
import watchLoader from "./pages/watch/watchLoader.ts";
import homeLoader from "./pages/home/homeLoader.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader
      },
      {
        path: "/results",
        element: <SearchPage />,
        loader: searchLoader
      },
      {
        path: "/watch",
        element: <WatchPage />,
        loader: watchLoader
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
