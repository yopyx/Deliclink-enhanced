import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const RestaurantCardsContainer = () => {
  return (
    <div className="flex flex-wrap">
      {[].map((e, i) => (
        <Link key={e?.info?.id + i} to={"/restaurants/" + e?.info?.id}>
          <RestaurantCard resData={e}></RestaurantCard>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantCardsContainer;
