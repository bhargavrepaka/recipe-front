/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRecipe } from '../context/recipeContext'
import axios from 'axios'
const Home = () => {
    const navigate = useNavigate()
    const { allRecipes, setAllRecipes,searchRecipes,setSearchRecipes } = useRecipe()
    const [loading, setLoading] = useState(false)
    console.log(allRecipes)

    useEffect(() => {
        const getRecipes = async () => {
            try {
                setLoading(true)
                const result = await axios.get("https://recipe-back-kygs.onrender.com/api/recipe/getrecipes", {
                    headers: {
                        Authorization: localStorage.getItem("authToken")
                    }
                })
                console.log(result)
                setAllRecipes(result.data.recipes)
                setSearchRecipes(result.data.recipes)
                
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        if (allRecipes.length<1) getRecipes()
        setSearchRecipes(allRecipes)

    }, [])

    return (
        <>
            <NavBar home={true}></NavBar>
            <Box width={"100vw"} height={"350px"} sx={{
                backgroundImage: "url('../../static/homeimg.jpeg')",
                backgroundRepeat: "no-repeat", backgroundSize: "100%", backgroundPositionY: "center"
            }} >
            </Box>
            <Box width={'95vw'} mx={'auto'}   >
                <Box >
                    <Typography my={3} textAlign={'center'} variant='h2'>Surf through the multiverse of Recipies</Typography>
                </Box>
                <Grid container flexWrap={'wrap'} gap={2} justifyContent={'center'}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        searchRecipes.map((recipe, idx) => (
                            <Grid key={idx} item sx={{ width: "320px" }} boxShadow={3} borderRadius={"15px"}>
                                <Card onClick={()=>navigate('/recipe/'+recipe._id)} sx={{ borderRadius: "15px", height:'450px',display:'flex', flexDirection:'column', justifyContent:'space-between',cursor:'pointer' }}   >
                                    <CardMedia
                                        sx={{ height: 240 }}
                                        image={recipe.thumbnail}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {recipe.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {recipe.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant='contained' color='success' onClick={() => navigate("/recipe/" + recipe._id)} sx={{ width: '100%' }}>Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </>
    )
}

export default Home

