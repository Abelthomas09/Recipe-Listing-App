import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

const RecipeSearch = ({ setCuisine }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce mechanism
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCuisine(searchTerm); // Call setCuisine after user stops typing
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup the timeout
  }, [searchTerm, setCuisine]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
      <TextField
        label="Search by Cuisine"
        variant="outlined"
        onChange={handleSearch}
        value={searchTerm}
        sx={{ width: '50%' }}
      />
    </Box>
  );
};

export default RecipeSearch;
