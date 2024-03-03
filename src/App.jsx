import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Recipe from './pages/Recipe'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Route>
        

      </Routes>
    </>
  )
}

export default App