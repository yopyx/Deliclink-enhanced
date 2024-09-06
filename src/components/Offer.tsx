import { OfferProps } from "../utils/types/props";

const Offer = ({ info }: OfferProps) => {
  const { header, couponCode, description } = info;
  return (
    <div className="bg-[#eeeeee80] w-[185px] h-[100px] p-2 mx-2 text-center border-4 border-dashed border-stone-400">
      <h4>{header}</h4>
      <h6>{couponCode}</h6>
      <h6>{description ? "| " + description + " |" : ""}</h6>
    </div>
  );
};

export default Offer;
