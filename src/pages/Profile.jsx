import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Fab, FormControl, Grid, Input, Modal, Stack, TextField, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import axios from "axios";
import { useRecipe } from "../context/recipeContext";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const { user } = useUser()
  const { userRecipies, setUserRecipies } = useRecipe()
  const [loading, setLoading] = useState(false)
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)

  const [formData, setFormData] = useState({
    thumbnail: null,
    title: '',
    prepTime: '',
    description: '',
    procedure: '',
    ingredients: ''
  });
  console.log(formData)

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recipe/userrecipes', {
          headers: {
            Authorization: localStorage.getItem("authToken")
          }
        });
        setUserRecipies(response.data.recipes);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };
    
    if(userRecipies.length==0){
      setLoading(true)
       fetchUserRecipes();
      }

  }, [])


  const handleCreateOpen = () => {
    setOpen(true);
    setCreate(true)
  };
  const handleEditOpen = (rcp) => {
    setOpen(true);
    setEdit(true)
    setFormData(rcp)
  };

  const handleClose = () => {
    setOpen(false);
    setCreate(false)
    setEdit(false)
    setFormData({
      thumbnail: null,
      title: '',
      prepTime: '',
      description: '',
      procedure: '',
      ingredients: ''
    })
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setFormData({ ...formData, thumbnail: base64Image });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const createRecipe = async () => {
    try {
      const result = await axios.post("http://localhost:8080/api/recipe/createrecipe", { ...formData, createdBy: user._id }, {
        headers: {
          Authorization: localStorage.getItem("authToken")
        }
      });

      setUserRecipies([...userRecipies, result.data.recipe]);
      toast.success("Created Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  const editRecipe = async () => {
    try {
      const result = await axios.put("http://localhost:8080/api/recipe/updaterecipe", { ...formData }, {
        headers: {
          Authorization: localStorage.getItem("authToken")
        }
      });

      setUserRecipies(userRecipies.map(recipe => recipe._id === result.data.recipe._id ? result.data.recipe : recipe));
      toast.success("Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)

    if (create) {
      await createRecipe();
    }
    else if (edit) {
      await editRecipe()
    }



    handleClose();
  };

  const handleDelete = async (rcp) => {
    try {
      await axios.delete(`http://localhost:8080/api/recipe/deleterecipe/${rcp._id}`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
          createdBy: rcp.createdBy
        }
      });
      setUserRecipies(userRecipies.filter(recipe => recipe._id !== rcp._id));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete recipe");
    }
  };

  const confirmDelete = (rcp) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      handleDelete(rcp);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <Box width={'100vw'} height={'100vh'} >
        <Box width={'95vw'} mx={'auto'}   >
          <Box width={'90vw'} mx={'auto'} height={'350px'} display={'flex'} justifyContent={'end'} flexDirection={"column"}  >
            <Stack borderRadius={2} direction={'row'} alignItems={'center'} gap={10} p={3} border={3}
                >
              {user && user.firstName && user.lastName && (
                <Avatar sx={{ width: 156, height: 156, fontSize: 56, ml: 5 }}>
                  {user.firstName[0] || " "}{user.lastName[0] || ' '}
                </Avatar>
              )}
              <Stack direction={'row'} gap={10}>
                <Typography variant="h4">Name: {user.firstName} {user.lastName} </Typography>
                <Typography variant="h4">Email: {user.email} </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box display={'flex'} justifyContent={'space-between'} width={'90vw'} mx={'auto'} mt={3} >
            <Typography m={'10px 0 20px 0'} textAlign={'center'} variant='h4'>Your Recipes</Typography>
            <Fab onClick={handleCreateOpen} variant="extended" color="success">
              <AddIcon />
              Create
            </Fab>
          </Box>
          <Grid container flexWrap={'wrap'} gap={2} justifyContent={'center'}
          >
            {loading ? <CircularProgress /> :

              userRecipies.length > 0 ?
                userRecipies?.map((recipe) => {
                  return (
                    <>
                      <Grid key={recipe._id} item sx={{ width: "320px" }} boxShadow={3} borderRadius={"15px"}>
                        <Card sx={{ borderRadius: "15px", height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}  >
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
                            <Button color="secondary" variant="outlined" onClick={() => handleEditOpen(recipe)} sx={{ width: '100%' }}>Edit</Button>
                            <Button color="error" variant="contained" onClick={() => confirmDelete(recipe)} sx={{ width: '100%' }}>Delete</Button>
                          </CardActions>
                          <CardActions>
                            <Button variant='contained' color='success' onClick={() => navigate("/recipe/" + recipe._id)} sx={{ width: '100%' }}>Learn More</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    </>

                  )
                })
                : <Typography variant="h6">You dont own any recipes yet... Begin brewing the magic!</Typography>}





          </Grid>
        </Box>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="create-recipe-modal"
          aria-describedby="form-to-create-new-recipe"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              backgroundColor: '#f9f9f9',
              border: '2px solid #ccc',
              boxShadow: 24,
              padding: '20px',
              borderRadius: '10px',
              '&:hover': {
                borderColor: '#888',
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              {create && 'Create'}
              {edit && 'Edit'} Recipe
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <Typography>Image</Typography>
                <Input
                  id="recipe-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={edit ? false : true}
                  autoFocus

                />
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Preparation Time (minutes)"
                name="prepTime"
                variant="outlined"
                type="number"
                value={formData.prepTime}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                variant="outlined"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Ingredients ( Separate with comma )"
                name="ingredients"
                variant="outlined"
                multiline
                rows={2}
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Procedure"
                name="procedure"
                variant="outlined"
                multiline
                rows={4}
                value={formData.procedure}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, '&:hover': { backgroundColor: '#1976d2' } }}>
                {create && 'Create'}
                {edit && 'Save Edit'}
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </>

  )
}

export default Profile