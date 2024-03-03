import { Box, Paper, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
import { useUser } from "../context/userContext"
import axios from "axios"
import { useEffect } from "react"

const Landing = () => {
  const {setUser,setAuth,isAuth}=useUser()
  useEffect(() => {
    async function getUserDetails(){
            try {
                const authToken=localStorage.getItem("authToken")
                const result = await axios.get("http://localhost:8080/api/user/getuser",{
                    headers:{
                        Authorization:authToken
                    }
                })
                console.log(result)
                if(result.data.success){
                    setUser(result.data.user)
                }
            } catch (error) {
                console.log(error)
                setAuth(false)
            }
        }

    if(!isAuth && localStorage.getItem('authToken') ) {
      setAuth(true)
      getUserDetails()

     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <>
    <NavBar></NavBar>
    <Box
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    height={"100vh"}
    sx={{backgroundColor: "linear-gradient(103.3deg, rgb(253, 109, 104) 7.7%, rgb(248, 150, 105) 90.8%)"}}
    >
      <img style={{position:"absolute", width:'1500px', zIndex:'-1', top:"50%", left:'50%',transform:"translate(-50%, -50%) "}} src="../../static/landing.jpeg" alt="" />

      <Paper boxShadow={3}  sx={{backgroundColor:'rgba(0,0,0,0.75)',padding:'60px', borderRadius:"30px"}} >
      <Typography border={2} textAlign={"center"} variant="h2"  color={'white'}>The Recipe Hut</Typography>
      <Typography mt={2} textAlign={"center"} variant="h3" color={'white'}>The best place to find your favorite recipes</Typography>
      <Typography mt={2} textAlign={"center"} variant="h4" color={'white'}>{isAuth? "Head home and ":"Sign In to"} surf through the multiverse of reciepes </Typography>


      </Paper>
      
      
    </Box>
    </>
  )
}

export default Landing