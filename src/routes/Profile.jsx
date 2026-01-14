import Button from 'react-bootstrap/Button';
import { db, authService, storageService } from '../firebase.js';
import { updateProfile, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import avata from "../default_icon.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { collection, where, onSnapshot, query, orderBy } from "firebase/firestore";
import Comment from '../components/Comment';

const Profile = () => {
  const auth = authService;
  const user = auth.currentUser;
  let navigate = useNavigate(); 
  const [profile, setProfile] = useState(avata);
  const [comments, setComments] = useState([]); //모든글 조회

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

    const storageRef = ref(storageService, `profile/${user.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const imageURL = await getDownloadURL(snapshot.ref);//업로드된 이미지의 절대 경로 할당
    setProfile(imageURL);

    updateProfile(user, {
      photoURL: imageURL
    });
  }

  const getComments = async () => {
    const q = query(collection(db, "comments"),orderBy('date', 'desc'), where("uid", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map(doc=> ({
        id:doc.id,
        ...doc.data()
      }));    
      setComments(commentsArray);
    });
  }  
  useEffect(()=>{
    user.photoURL?.includes('firebase') && setProfile(user.photoURL);
    getComments();
  },[]);

  return (
    <>
      <h2>Profile Page</h2>
      <div className="profile">
        <p className='d-flex gap-1 align-items-center'>
          <img src={profile} alt="프로필 이미지" />
          {user.displayName}
        </p>
        <input type="file" accept='image/*' id="avata" className='hidden' onChange={handleChange} />
        <label htmlFor="avata" className='btn btn-secondary btn-sm'>이미지 업데이트</label>
      </div>
      <Button variant="primary" onClick={handleLogout}>로그아웃</Button>
      <hr />
      <ListGroup>
        {comments.map(item => (
          <Comment key={item.id} commentObj={item} isOwner={item.uid === user.uid} />
        )
        )}
      </ListGroup>      
    </>
  )
}
export default Profile;