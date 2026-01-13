import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = ()=>{
  return(
    <Navbar bg="light" data-bs-theme="light" className="px-3 justify-content-between">
      <Navbar.Brand as={Link} to="/">
       Home
      </Navbar.Brand>
      <Nav>
         <Nav.Link as={Link} to="profile">Profile</Nav.Link>   
      </Nav>     
    </Navbar>
  )
}
export default Navigation;