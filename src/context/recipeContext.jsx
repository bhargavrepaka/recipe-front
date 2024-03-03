/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext,useContext,useState } from "react"

const RecipeContext=createContext()

export const RecipeProvider=({children})=>{
    const [allRecipes,setAllRecipes]=useState([])
    const [searchRecipes,setSearchRecipes]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [error,setError]=useState("")
    const [userRecipies,setUserRecipies]=useState([])
    

    return <RecipeContext.Provider
    value={{
        allRecipes,
        setAllRecipes,
        isLoading,
        setLoading,
        error,
        setError,
        userRecipies,
        setUserRecipies,
        searchRecipes,
        setSearchRecipes
    }}>
    {children}
    </RecipeContext.Provider>
}

export const useRecipe=()=>{
    return useContext(RecipeContext)
}

