/* eslint-disable react/prop-types */
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Input, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import SearchIcon from '@mui/icons-material/Search';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRecipe } from '../context/recipeContext';
const NavBar = ({home}) => {
  const navigate = useNavigate()
  const { isAuth, setUser, setAuth } = useUser()
  const {allRecipes,setSearchRecipes}=useRecipe()
  const [search, setSearch] = useState('')
  
  const handleSearch=(e)=>{
    const filteredRecipes = e.target.value === '' ? allRecipes : allRecipes.filter(recipe => recipe.title.toLowerCase().includes(e.target.value.toLowerCase()) || recipe.ingredients.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchRecipes(filteredRecipes)
    setSearch(e.target.value)
  }
  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    setUser({})
    setAuth(false)
    toast.success("Signed Out, See you again :) ")
    navigate("/")
  }

  return (
    <AppBar position="fixed"
      sx={{ borderRadius: '25px', width: '70%', bgcolor: 'rgba(0,0,0,0.7)', zIndex: 1000, margin: "20px auto", left: 0, right: 0 }}>
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          component="div"
          flexGrow={1}
          onClick={() => navigate("/")}
        >
          The Recipe Hut
        </Typography>
        {home && 
        <Stack border={0.5} p={0.2} borderRadius={2} direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <SearchIcon color='white' sx={{fontSize:25, mr:1}} />
        <Input type="text" value={search} onChange={handleSearch} placeholder='Search...' sx={{color:"white",fontSize:20}}/>
        </Stack>
        }
        {isAuth && <Button
          onClick={() => navigate("/home")}
          sx={{ color: "white", fontSize: '18px', p: "15px", borderRadius: '5px', }}
        >Home</Button>}

        {!isAuth && <Button
          onClick={() => navigate("/signin")}
          sx={{ color: "white", fontSize: '18px', p: "15px", borderRadius: '5px', }}
        >Sign In</Button>}

        {!isAuth && <Button
          onClick={() => navigate("/signup")}
          sx={{ color: "white", fontSize: '18px', p: "15px", borderRadius: '5px', }}
        >Sign Up</Button>}

        {isAuth && <Button
          onClick={() => navigate("/profile")}
          sx={{ color: "white", fontSize: '18px', p: "15px", borderRadius: '5px', }}
        >Profile</Button>}

        {isAuth && <Button
          onClick={handleSignOut}
          sx={{ color: "white", fontSize: '18px', p: "15px", borderRadius: '5px', }}
        >Sign Out</Button>}
        {/* <InputBase sx={{border:"1px solid white", fontSize:'18px', color:'white' , padding:"3px 10px" , borderRadius:'10px'}}> </InputBase> */}
      </Toolbar>
    </AppBar>

  )
}

export default NavBar