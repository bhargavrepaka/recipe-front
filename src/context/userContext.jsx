/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext, useContext, useState } from "react";

const UserContext=createContext()

export function UserProvider({children}){
    const [isAuth,setAuth]=useState(false)
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState("")
    const [user,setUser]=useState({})


   return <UserContext.Provider 
    value={{
        isAuth,
        setAuth,
        isLoading,
        setLoading,
        error,
        setError,
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}

export function useUser(){
    return useContext(UserContext)
}