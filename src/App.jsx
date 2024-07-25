import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import Recipes from "./components/Recipes"
import Bookmarks from "./components/Bookmarks"
import GoalTracking from "./components/GoalTracking"
import Profile from "./components/Profile"
import Home from "./components/Home"
import ShoppingList from "./components/ShoppingList"
import Sidebar from './components/Sidebar'
import Login from './components/Login'
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
