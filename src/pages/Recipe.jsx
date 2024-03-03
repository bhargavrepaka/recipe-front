import { Box, Card, CardContent, CardMedia, Chip, Divider, Fab, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { useRecipe } from '../context/recipeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import ReplyIcon from '@mui/icons-material/Reply';
const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { allRecipes } = useRecipe();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      const selectedRecipe = allRecipes.find((recipe) => recipe._id === id);
      if (selectedRecipe) {
        setRecipe(selectedRecipe);
        setLoading(false);
      } else {
        await getRecipeData();
      }
    };

    const getRecipeData = async () => {
      try {
        const result = await axios.get(`https://recipe-back-kygs.onrender.com/api/recipe/getrecipe/${id}`, {
          headers: {
            Authorization: localStorage.getItem('authToken'),
          },
        });
        setRecipe(result.data.recipe);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    getRecipe();
  }, [allRecipes, id]);

  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          padding: 2,
          backgroundImage: 'url("../../static/ORFF2A0.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Fab color="error" aria-label="back"  onClick={()=>navigate("/home")}>
  <ReplyIcon  /> 
</Fab>
        {loading && <CircularProgress />} 
        {recipe && (
          <Card
            raised={true}
            sx={{
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'row',
              mt: 2,
              width: '1200px',
              height: '600px',
            }}
          >
            <CardMedia
              sx={{
                minWidth: '400px',
                height: '600px',
                objectFit: 'cover',
              }}
              image={recipe?.thumbnail}
              title='Recipe Image'
            />
            <CardContent>
              <Typography gutterBottom variant='h2' component='h2'>
                {recipe.title}
              </Typography>
              <Typography variant='h6' color='textSecondary' gutterBottom>
                Preparation Time: {recipe.prepTime} minutes
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant='h5' component='p' gutterBottom>
                Description: {recipe.description}
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant='h5' component='p' gutterBottom>
                Ingredients :{' '}
                {recipe.ingredients && recipe?.ingredients.split(',').map((ingredient, idx) => {
                  console.log(ingredient);
                  return <Chip sx={{ m: 0.3 }} key={idx} label={ingredient} />;
                })}
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant='h5' component='h3' gutterBottom>
                Procedure :
              </Typography>
              <Typography variant='h6' component='p'>
                {recipe.procedure}
              </Typography>
            </CardContent>
          </Card>
        )}
        {error && <Typography variant='h1' color={'white'}>The page does not exist :( </Typography>}
      </Box>
    </>
  );
};

export default Recipe;
