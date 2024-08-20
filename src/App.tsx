import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import { appStore } from "./utils/redux/store";

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
        path: "/signin",
        element: <SignIn />,
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
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
