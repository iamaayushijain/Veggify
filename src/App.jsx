import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import Recipes from './Components/Recipes.jsx'
import Bookmarks from "./Components/Bookmarks.jsx"
import GoalTracking from "./Components/GoalTracking.jsx"
import Profile from "./Components/Profile.jsx"
import Home from "./Components/Home.jsx"
import ShoppingList from "./Components/ShoppingList.jsx"
import Sidebar from './Components/Sidebar.jsx'
import Login from './Login.jsx'
import { auth } from './config/firebase';
import './config/firebase';
import { useState, useEffect } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Set up an authentication state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);


  return (
    <>
    <div>

   <BrowserRouter>

  <div className='flex gap-[15vh]'>
   <div className='w-[35vh]'>
   {isLoggedIn && (
             <div className='fixed h-screen w-[35vh]'>
             <Sidebar />
           </div>
          )}
   </div>


   <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/recipes" element={<Recipes/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/bookmarks" element={<Bookmarks/>} />
      <Route path="/goaltracking" element={<GoalTracking/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/shoppinglist" element={<ShoppingList/>} />
      
     </Routes>

     </div>
    

     </BrowserRouter>





    </div>
    
      
    </>
  )
}

export default App
