import {useNavigate} from 'react-router-dom'

function Sidebar(){
    const navigate = useNavigate();

    return(
        
        <div className="h-screen bg-[#2E8B57]">
            <div className="font-semibold text-5xl p-5 text-white ">Veggify</div>
            <div className="text-sm font-medium text-white px-5 py-1">Your Personal Health Companion</div>

            <div className="pt-[30vh] grid-col-1  pl-8 text-white text-xl font-medium ">
                <div  onClick={() => navigate("/profile")}  className="py-4 cursor-pointer">Profile</div>
                <div  onClick={() => navigate("/goaltracking")}  className="py-4 cursor-pointer">Goals Tracking</div>
                <div  onClick={() => navigate("/recipes")}  className="py-4 cursor-pointer">Recipes</div>
                <div  onClick={() => navigate("/bookmarks")} className="py-4 cursor-pointer">Bookmarks</div>
                <div  onClick={() => navigate("/shoppinglist")}  className="py-4 cursor-pointer">Shopping list</div>
                <div  onClick={() => navigate("/login")}  className="py-4 cursor-pointer">Login</div>
                


            </div>
            
        </div>
    )



}

export default Sidebar