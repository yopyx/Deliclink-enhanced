import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { appStore, persistor } from "./utils/redux/store";
import CollectionError from "./components/error/CollectionError";
import MainPageError from "./components/error/MainPageError";
import { lazy, Suspense } from "react";
import LandingPageShimmer from "./components/shimmer/LandingPageShimmer";
import MainPageShimmer from "./components/shimmer/MainPageShimmer";
import { PersistGate } from "redux-persist/integration/react";
import MenuShimmer from "./components/shimmer/MenuShimmer";
import CollectionShimmer from "./components/shimmer/CollectionShimmer";
import SearchShimmer from "./components/shimmer/SearchShimmer";

const LandingPage = lazy(() => import("./components/LandingPage"));
const MainPage = lazy(() => import("./components/MainPage"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Collection = lazy(() => import("./components/Collection"));
const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LandingPageShimmer />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/city/:cityName",
        element: (
          <Suspense fallback={<MainPageShimmer />}>
            <MainPage />
          </Suspense>
        ),
        errorElement: <MainPageError />,
      },
      {
        path: "/restaurants/:rsId",
        element: (
          <Suspense fallback={<MenuShimmer />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/collections/:coId",
        element: (
          <Suspense fallback={<CollectionShimmer />}>
            <Collection />
          </Suspense>
        ),
        errorElement: <CollectionError />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<SearchShimmer />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LandingPageShimmer />}>
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: <div>Error</div>,
  },
]);
function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
