import  { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

const PrivateRoute = () => {
    const navigate=useNavigate()
    const { isAuth, setAuth,setUser} = useUser()
    const [loading,setLoading]=useState(true)
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
                    console.log(result.data.user)
                      setUser(result.data.user)
                  }
              } catch (error) {
                  console.log(error)
                  setAuth(false)
              }
          }
  
      if(isAuth){setLoading(false)}
      else if(!isAuth && localStorage.getItem('authToken') ) {
        setAuth(true)
        getUserDetails()
        setLoading(false)
       }
      else{
        navigate("/")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    return (
      loading?<CircularProgress />
            :
       isAuth?<Outlet />
            :
              <>
                {console.log("sending guy to login", isAuth)}
                <Navigate to={"/"}></Navigate>
              </>          
    )
  }

export default PrivateRoute