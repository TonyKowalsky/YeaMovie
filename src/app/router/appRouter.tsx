import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import { ByCategoryPage } from "@/pages/by-category";
import { ErrorPage } from "@/pages/error";
import { FavoritesPage } from "@/pages/favorites";
import { MainPage } from "@/pages/main";
import { MoviePage } from "@/pages/movie";
import { PopularMoviesPage } from "@/pages/popular-movies";
import { PopularSeriesPage } from "@/pages/popular-series";
import { SearchMoviesPage } from "@/pages/search";



const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <div>Error</div>,
      children: [
        {
          element: <MainPage />,
          path: "/",
        },
        {
          element: <MoviePage />,
          path: "/movie/:kinopoiskId",
        },
        {
          element: <SearchMoviesPage />,
          path: "/search",
        },
        {
          element: <FavoritesPage />,
          path: "/favorites",
        },
        {
          element: <PopularMoviesPage />,
          path: "/TOP_POPULAR_MOVIES",
        },
        {
          element: <PopularSeriesPage />,
          path: "/POPULAR_SERIES",
        },
        {
          element: <ErrorPage />,
          path: "/404",
        },
        {
          element: <ByCategoryPage />,
          path: "/by_category",
        },
      ],
    },
  ]);

export default appRouter;
