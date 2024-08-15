import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/auth",
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
  return <RouterProvider router={appRouter} />;
}

export default App;
