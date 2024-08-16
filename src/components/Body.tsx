import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
