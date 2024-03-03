import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx'
import { RecipeProvider } from './context/recipeContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RecipeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeProvider>
  </UserProvider>
)