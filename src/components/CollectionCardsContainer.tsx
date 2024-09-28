import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

const CollectionCardsContainer = () => {
  return (
    <div className="flex flex-wrap">
      {[].map((c, i) => (
        <Link key={c!.info.id + i} to={"/restaurants/" + c!.info.id}>
          <RestaurantCard resData={c!}></RestaurantCard>
        </Link>
      ))}
    </div>
  );
};

export default CollectionCardsContainer;
