import { Routes, Route } from "react-router-dom";
import Home from '../routes/Home';

const AppRouter = ()=>{
  return(
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
  )
}
export default AppRouter;