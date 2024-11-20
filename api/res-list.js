import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { lat, lng, dataObj } = req.body;
    try {
      const response = await axios.post(
        `https://www.swiggy.com/api/seo/getListing?lat=${lat}&lng=${lng}&isDineoutCollection=false`,
        dataObj,
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
      console.error("Error:", error);
      res.status(500).send("Error fetching data");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
