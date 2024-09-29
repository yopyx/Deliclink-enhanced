import { Link } from "react-router-dom";
import { CollectionCardsContainerProps } from "../utils/types/props";
import RestaurantCard from "./RestaurantCard";

const CollectionCardsContainer = ({
  dataList,
}: CollectionCardsContainerProps) => {
  return (
    <div className="w-[85%] mx-auto ml-0 flex flex-col gap-y-7 overflow-y-hidden justify-center">
      <div className="flex flex-wrap gap-x-1 mx-auto -ml-1 4k:res-container-4k 2xl:res-container-2xl lg:res-container-lg">
        {(dataList || []).map((c, i) => (
          <Link key={c!.info.id + i} to={"/restaurants/" + c!.info.id}>
            <RestaurantCard resData={c!}></RestaurantCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionCardsContainer;
