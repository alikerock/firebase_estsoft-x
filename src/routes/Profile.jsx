import Button from 'react-bootstrap/Button';
import { signOut } from "firebase/auth";
import { authService } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const auth = authService;
  let navigate = useNavigate(); 

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('로그아웃되었습니다.');
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <h2>Profile Page</h2>
      <Button variant="primary" onClick={handleLogout}>로그아웃</Button>
    </>
  )
}
export default Profile;