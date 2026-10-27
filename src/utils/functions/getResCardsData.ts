import { NextListParam, ResListUpdate } from "../types/fetchedData";

const getResCardsData = async (
  lat: string,
  lng: string,
  dataObj: NextListParam,
) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? "https://deliclink.vercel.app/api/reslist"
        : "http://localhost:3001/reslist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lng, dataObj }),
      },
    );
    const { data } = await response.json();
    return data as ResListUpdate;
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
