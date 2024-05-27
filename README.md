# CallerID: Web Application Documentation

## Overview
CallerID is an innovative web application designed to provide users with detailed information about any phone number. Leveraging the power of the Truecaller API, this platform offers a safe and secure way to look up phone numbers without the need to download the Truecaller app onto your device.

## Features
- **Phone Number Lookup**: Retrieve detailed information about any phone number.
- **Country Code Selection**: Select the appropriate country code for the phone number.
- **Real-Time Loading Animation**: Visual feedback during the data retrieval process.
- **Responsive Design**: Ensures compatibility across various devices.

## Technologies Used
- **Frontend**: React, Framer Motion, Material-UI, Axios, Lottie, React Awesome Button
- **Backend**: Express.js, TruecallerJS, CORS
- **Styling**: Styled Components, CSS

## Getting Started
Follow these steps to set up and run the CallerID application locally.

### Prerequisites
- Node.js
- npm or yarn
- Truecaller API credentials

### Installation
1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/callerid.git
   cd callerid
   
2. **Install dependencies:**

	```sh
	npm install
	# or
	yarn install
   ```
	
3. **Running the Application:**

	**Frontend:**

	```sh
	cd client
	npm start
	# or
	yarn start
	```

	**Backend:**

	```sh
	cd server
	node server.js
   ```
## Frontend Code Explanation

### App.jsx


The App.jsx file is the main component of the application, responsible for rendering the user interface and handling user interactions.

**Importing Necessary Libraries and Components**

```jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextField, Container, Typography, CssBaseline, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { styled } from "@mui/system";
import GlobalStyles from "@mui/material/GlobalStyles";
import Lottie from "lottie-react";
import axios from "axios";
import PhoneAnimation from "./assets/Phone.json";
import LoadingAnimation from "./assets/Load.json";
import ResultDisplay from "./Components/ResultDisplay";
import ScrollableContainer from "./Components/ScrollableContainer";
import Codes from "./assets/Codes.json";
import { AwesomeButton, AwesomeButtonSocial } from "react-awesome-button";
import { BeakerIcon } from "@primer/octicons-react";
import "react-awesome-button/src/styles/styles.scss";
```

**Defining Global Styles**

```jsx
const globalStyles = (
  <GlobalStyles
    styles={{
      "html, body": {
        margin: 0,
        padding: 0,
        height: "100%",
        overflow: "hidden",
      },
    }}
  />
);
```

**Creating Styled Components**

```jsx
const Background = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(120deg, #a8e063 0%, #56ab2f 100%)",
  margin: 0,
  padding: 0,
});

const FormContainer = styled(motion.div)({
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  width: "100%",
  textAlign: "center",
});

const CustomAwesomeButton = styled(AwesomeButton)({
  "--button-default-height": "70px",
  "--button-default-font-size": "18px",
  "--button-horizontal-padding": "30px",
  marginTop: "1rem",
});

const CustomAwesomeButtonSocial = styled(AwesomeButtonSocial)({
  "--button-default-height": "70px",
  "--button-default-font-size": "18px",
  "--button-horizontal-padding": "30px",
  marginTop: "1rem",
});

const AnimationContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
});

const SlideOutSection = styled(motion.div)({
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "8px",
  marginTop: "1rem",
  textAlign: "center",
});

const SocialMediaContainer = styled("div")({
  position: "fixed",
  bottom: "10px",
  right: "2rem",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",
});
```

**Main App Component**

```jsx
const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (phoneNumber.length !== 10) {
      setError("Please make sure the number is 10 digits long");
      setLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axios.post("https://callerid-backend.onrender.com/api/search", {
        countryCode,
        phoneNumber,
      });

      console.log(response.data);

      setLoading(false);
      setResult(response.data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      setLoading(false);
      setResult({ error: "An error occurred" });
    }
  };

  return (
    <>
      <CssBaseline />
      {globalStyles}
      <Background>
        <Container>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ height: "100vh" }}
          >
            <Grid item xs={12} md={6}>
              <FormContainer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" component="h2" gutterBottom>
                  Enter the Phone Number
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="country-select-label">
                          Country
                        </InputLabel>
                        <Select
                          labelId="country-select-label"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          required
                        >
                          {Codes.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        margin="normal"
                        required
                        error={!!error}
                        helperText={error}
                      />
                    </Grid>
                  </Grid>
                  <CustomAwesomeButton type="secondary" after={<BeakerIcon />}>
                    Get Details
                  </CustomAwesomeButton>
                </form>
                <AnimatePresence>
                  {loading && (
                    <SlideOutSection
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Lottie animationData={LoadingAnimation} />
                    </SlideOutSection>
                  )}
                  {!loading && result && (
                    <SlideOutSection
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {result.error ? (
                        <Typography variant="body1">{result.error}</Typography>
                      ) : (
                        <ScrollableContainer>
                          <ResultDisplay result={result} />
                        </ScrollableContainer>
                      )}
                    </SlideOutSection>
                  )}
                </AnimatePresence>
              </FormContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimationContainer>
                <Lottie animationData={PhoneAnimation} />
              </AnimationContainer>
            </Grid>
          </Grid>
        </Container>
        <SocialMediaContainer>
          <CustomAwesomeButtonSocial type="github" href="https://github.com/satwikmishra1107">
            GitHub
          </CustomAwesomeButtonSocial>
          <CustomAwesomeButtonSocial
            type="linkedin"
            href="https://www.linkedin.com/in/satwik-mishra-a761b521b/"
          >
            LinkedIn
          </CustomAwesomeButtonSocial>
          <CustomAwesomeButtonSocial
            type="instagram"
            href="https://www.instagram.com/satwik_mishra11/"
          >
            Instagram
          </CustomAwesomeButtonSocial>
        </SocialMediaContainer>
      </Background>
    </>
  );
};

export default App;
```

## Backend Code Explanation

### Server.js

The Server.js file sets up the backend server using Express.js and handles the API request to fetch phone number details using the TruecallerJS library.

**Importing Necessary Libraries and Setting Up Express App**

```js
import express from "express";
import truecallerjs from "truecallerjs";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
```

**Handling the Phone Number Lookup Request**

```js
app.post("/api/search", async (req, res) => {
  const { countryCode, phoneNumber } = req.body;

  console.log(countryCode, phoneNumber);

  const searchData = {
    number: phoneNumber,
    countryCode: countryCode,
    installationId: process.env.ID,
  };

  try {
    const response = await truecallerjs.search(searchData);

    console.log(response);

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
```

**Starting the Server**

```js
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
