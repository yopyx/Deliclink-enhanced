export default async function handler(req, res) {
  if (req.method === "GET") {
    const { lat, lng, resId } = req.query;
    try {
      const response = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&submitAction=ENTER`,
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
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
