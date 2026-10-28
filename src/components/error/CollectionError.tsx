import { Link } from "react-router";
import { useAppSelector } from "../../utils/types/reactReduxHooks";

const CollectionError = () => {
  const { city, geometry } = useAppSelector(
    (store) => store.geoLocation.currentLocation,
  );
  return (
    <div className="w-1/3 m-auto flex flex-col gap-y-6 align-middle">
      <div className="mt-10">
        <img
          src={"/organic-bag-icon-flat-vector-food-paper.jpg"}
          alt="profile"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="mx-auto">
        <Link to={`/city/${city}?lat=${geometry.lat}&lng=${geometry.lng}`}>
          <button className="bg-orange-600 hover:bg-orange-400 text-white p-1 px-6 rounded-lg">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionError;
