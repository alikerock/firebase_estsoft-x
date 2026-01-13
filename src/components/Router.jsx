import { Routes, Route } from "react-router-dom";
import Home from '../routes/Home';
import Auth from "../routes/Auth";
import Nav from "./Nav";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn})=>{ 

  return(
    <>
      {isLoggedIn && <Nav/>}
      <Routes>
        {
          isLoggedIn ? 
          <>
            <Route path="/" element={<Home/>}></Route> 
            <Route path="/profile" element={<Profile/>}></Route> 
          </>
          : 
          <Route path="/" element={<Auth/>}></Route> 
        }
        
      </Routes>
    </>
  )
}
export default AppRouter;