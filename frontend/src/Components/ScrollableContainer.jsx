import { Box, styled } from '@mui/material';

const ScrollableContainer = styled(Box)(({ theme }) => ({
  maxHeight: '50vh', // Adjust this value as needed
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[200],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[500],
    borderRadius: '4px',
  },
}));

export default ScrollableContainer;