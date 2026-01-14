import Button from 'react-bootstrap/Button';
import { authService, storageService } from '../firebase.js';
import { updateProfile, signOut } from "firebase/auth";
import { useNavigate, useSearchParams } from 'react-router-dom';
import avata from "../default_icon.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
console.log(authService);

const Profile = () => {
  const auth = authService;
  let navigate = useNavigate(); 
  const [profile, setProfile] = useState(avata);

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert('로그아웃되었습니다.');
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }
  const handleChange = async (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;

    const storageRef = ref(storageService, `profile/${auth.currentUser.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(snapshot.ref);//업로드된 이미지의 절대 경로 할당
    setProfile(imageURL);

    updateProfile(auth.currentUser, {
      photoURL: imageURL
    });
  }

  useEffect(()=>{
    auth.currentUser.photoURL.includes('firebase') && setProfile(auth.currentUser.photoURL);
  },[]);

  return (
    <>
      <h2>Profile Page</h2>
      <div className="profile">
        <p className='d-flex gap-1 align-items-center'>
          <img src={profile} alt="프로필 이미지" />
          {auth.currentUser.displayName}
        </p>
        <input type="file" accept='image/*' id="avata" className='hidden' onChange={handleChange} />
        <label htmlFor="avata" className='btn btn-secondary btn-sm'>이미지 업데이트</label>
      </div>
      <Button variant="primary" onClick={handleLogout}>로그아웃</Button>
    </>
  )
}
export default Profile;