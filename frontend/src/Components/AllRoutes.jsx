import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Blogs from "../Pages/Blogs";

export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
        </Routes>
    )
}