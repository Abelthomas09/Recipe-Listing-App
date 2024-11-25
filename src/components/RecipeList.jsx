import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/recipesSlice';
import { Link } from 'react-router-dom';
import {Box, Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Snackbar, Alert} from '@mui/material';
import Pagination from './Pagination';
import RecipeSearch from './RecipeSearch';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { data, total, status } = useSelector((state) => state.recipes);
  const [page, setPage] = useState(1);
  const [cuisine, setCuisine] = useState('');
  const [openAlert, setOpenAlert] = useState(false); // State to handle the alert visibility

  // Fetch recipes based on page and cuisine filter
  useEffect(() => {
    const limit = 10;
    const skip = (page - 1) * limit;
    dispatch(fetchRecipes({ limit, skip, cuisine })); // Dispatch API call
  }, [dispatch, page, cuisine]);

  // Filter the data based on cuisine search term
  const filteredData = cuisine
    ? data.filter((recipe) =>
      recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
    )
    : data;

  // Check if no results found after filtering
  useEffect(() => {
    if (filteredData.length === 0 && cuisine !== '') {
      setOpenAlert(true); // Show alert if no results are found and search term is not empty
    }
  }, [filteredData, cuisine]);

  // Handle close of the alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Search Component */}
      <RecipeSearch setCuisine={setCuisine} />

      {/* Recipes List */}
      <Grid container spacing={2} sx={{ marginTop: '20px', justifyContent: 'center' }}>
        {status === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredData.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id} sx={{ maxWidth: '320px' }}>
              <Card sx={{ height: '100%'}}>
                <CardMedia
                  component="img"
                  height="250px"
                  image={recipe?.image || 'https://via.placeholder.com/250'}
                  alt={recipe?.name || 'Recipe'}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.cuisine}
                  </Typography>
                  <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        marginTop: '10px',
                        color: '#1976d2',
                        fontWeight: 'bold',
                      }}
                    >
                      View Recipe
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Pagination */}
      <Pagination total={total} page={page} setPage={setPage} />

      {/* Alert if no results found */}
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
          No recipes found for "{cuisine}"
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecipeList;
