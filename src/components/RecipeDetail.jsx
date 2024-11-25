import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, List, ListItem, Button } from '@mui/material';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/recipes/${id}`).then((response) => {
      setRecipe(response.data);
    });
  }, [id]);

  return recipe ? (
    <Box sx={{ padding: '20px' }}>
      {/* Back to Recipe List Link */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={{ marginBottom: '20px' }}>
          Back to Recipe List
        </Button>
      </Link>

      <Typography variant="h4" gutterBottom>
        {recipe.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        {recipe.description}
      </Typography>
      <Typography variant="h6">Ingredients:</Typography>
      <List>
        {recipe.ingredients.map((ing, index) => (
          <ListItem key={index}>{ing}</ListItem>
        ))}
      </List>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <CircularProgress />
    </Box>
  );
};

export default RecipeDetail;
