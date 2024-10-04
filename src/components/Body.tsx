import { Outlet } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
