import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import { appStore } from "./utils/redux/store";
import CollectionError from "./components/error/CollectionError";
import MainPageError from "./components/error/MainPageError";
import Search from "./components/Search";
import Collection from "./components/Collection";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/city/:cityName",
        element: <MainPage />,
        errorElement: <MainPageError />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:rsId",
        element: <RestaurantMenu />,
      },
      {
        path: "/collection/:coId",
        element: <Collection />,
        errorElement: <CollectionError />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
