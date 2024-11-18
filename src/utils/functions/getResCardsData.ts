import { NextListParam, ResListUpdate } from "../types/fetchedData";
import axios from "axios";

const getResCardsData = async (
  lat: string,
  lng: string,
  dataObj: NextListParam
) => {
  try {
    const response = await axios.post<ResListUpdate>(
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? "https://deliclink.vercel.app/res-list"
        : "http://localhost:3001/res-list",
      { lat, lng, dataObj },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default getResCardsData;

// const getResCardsData = async (
//   lat: string,
//   lng: string,
//   dataObj: NextListParam
// ) => {
//   try {
//     const response = await axios.post<ResListUpdate>(
//       import.meta.env.VITE_ENVIRONMENT === "production"
//         ? "https://deliclink.vercel.app/api/res-list"
//         : "http://localhost:3001/api/res-list",
//       { lat, lng, dataObj },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
