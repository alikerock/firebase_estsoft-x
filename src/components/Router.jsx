import { Routes, Route } from "react-router-dom";
import Home from '../routes/Home';
import Auth from "../routes/Auth";

const AppRouter = ({isLoggedIn})=>{ 

  return(
    <Routes>
      {
        isLoggedIn ? 
        <Route path="/" element={<Home/>}></Route> 
        : 
        <Route path="/" element={<Auth/>}></Route> 
      }
      
    </Routes>
  )
}
export default AppRouter;