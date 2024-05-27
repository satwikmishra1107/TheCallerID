import React from 'react';
import { Typography, Box } from '@mui/material';

const ResultDisplay = ({ result }) => {
  const { name, alternateName, email, addresses, countryDetails } = result;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1">
        Alternate Name: {alternateName || 'N/A'}
      </Typography>
      <Typography variant="body1">Email: {email || 'Unknown'}</Typography>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Addresses
        </Typography>
        {addresses.map((address, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body1">
              {address.city}, {address.countryCode} ({address.timeZone})
            </Typography>
          </Box>
        ))}
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Country Details
        </Typography>
        <Typography variant="body1">Name: {countryDetails.name}</Typography>
        <Typography variant="body1">
          Native Name: {countryDetails.native}
        </Typography>
        <Typography variant="body1">
          Phone Code: +{countryDetails.phone[0]}
        </Typography>
        <Typography variant="body1">Continent: {countryDetails.continent}</Typography>
        <Typography variant="body1">Capital: {countryDetails.capital}</Typography>
        <Typography variant="body1">
          Currency: {countryDetails.currency.join(', ')}
        </Typography>
        <Typography variant="body1">
          Languages: {countryDetails.languages.join(', ')}
        </Typography>
        <Typography variant="body1">Flag: {countryDetails.flag}</Typography>
      </Box>
    </Box>
  );
};

export default ResultDisplay;