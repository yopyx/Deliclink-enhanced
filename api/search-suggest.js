export default async function handler(req, res) {
  const { lat, lng, query } = req.query;
  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&includeIMItem=true`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.message,
      error.response ? error.response.data : ""
    );
    res.status(500).send("Error fetching data");
  }
}
