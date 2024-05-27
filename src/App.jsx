import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import Recipes from "./components/Recipes"
import Bookmarks from "./components/Bookmarks"
import GoalTracking from "./components/GoalTracking"
import Profile from "./components/Profile"
import Home from "./components/Home"
import ShoppingList from "./components/ShoppingList"
import Sidebar from './components/Sidebar'
import Login from './components/Login'




function App() {
 

  return (
    <>
    <div>

   <BrowserRouter>

  <div className='flex gap-[15vh]'>
   <div className='w-[35vh]'>
   <Sidebar/>
   </div>


   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/bookmarks" element={<Bookmarks/>} />
      <Route path="/goaltracking" element={<GoalTracking/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/shoppinglist" element={<ShoppingList/>} />
      <Route path="/login" element={<Login/>} />


     </Routes>

     </div>
    

     </BrowserRouter>





    </div>
    
      
    </>
  )
}

export default App
