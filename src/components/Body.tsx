import { Outlet } from "react-router-dom";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const Body = () => {
  return (
    <div className="flex flex-col">
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
