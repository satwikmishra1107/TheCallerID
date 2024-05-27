import express from "express";
import truecallerjs from "truecallerjs";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/search", async (req, res) => {

  const {countryCode,phoneNumber} = req.body;

  console.log(countryCode,phoneNumber)

  const searchData = {
    number: phoneNumber,
    countryCode: countryCode,
    installationId:
      process.env.ID,
  };

  try {
    const response = await truecallerjs.search(searchData);

    console.log(response)

    const name = response.getName();
    const alternateName = response.getAlternateName();
    const address = response.getAddresses();
    const email = response.getEmailId();
    const country = response.getCountryDetails();
    res.json({
      name,
      alternateName,
      addresses: address,
      email,
      countryDetails: country,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
