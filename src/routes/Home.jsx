import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import Comment from '../components/Comment';

const Home = ({ userId }) => {
  const [comment, setComment] = useState(''); //새글 입력
  const [comments, setComments] = useState([]); //모든글 조회
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);


  const handleChange = (e) => {
    setComment(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: comment,
        date: serverTimestamp(),
        uid: userId
      });
      console.log("새글의 고유 id", docRef.id);
      setComment(''); //입력후 입력칸 비우기
    } catch (e) {
      console.log(e);
    }
  }
  const getComments = async () => {
    /*
    const querySnapshot = await getDocs(collection(db, "comments"));
    const commentsArray = querySnapshot.docs.map(doc=> ({
      id:doc.id,
      ...doc.data()
    }));
    setComments(commentsArray);
    */
    const q = query(collection(db, "comments"),orderBy('date', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map(doc=> ({
        id:doc.id,
        ...doc.data()
      }));    
      setComments(commentsArray);
    });
  }
  useEffect(() => {
    getComments();
  }, []);//최초 한번 실행

  const handleFileChange = (e)=>{
    const {target:{files}} = e; // const files = e.target.files
    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (e)=>{ //첨부파일 읽기가 끝나면      
      setAttachment(e.target.result);
    }
    reader.readAsDataURL(theFile); //첨부파일의 정보를 읽어
    
  }
  const handleFileCancel = ()=>{
    setAttachment(null); //파일정보가 담긴 변수 초기화
    if(fileInputRef.current.value){
      fileInputRef.current.value = ''; //파일정보 초기화
    }
  }
  return (
    <>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>새 글을 입력해주세요</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">          
          <Form.Control type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
        </Form.Group>
        {
          attachment && 
          <div className='mb-1'>
            <img src={attachment} width='50px' height='50px' alt=''/>
            <Button type="button" variant="secondary" size="sm" onClick={handleFileCancel}>취소</Button>
          </div>
        }
        <Button type="submit" variant="primary">새글 입력</Button>
      </Form>
      <hr />
      <ListGroup>
        {comments.map(item => (
          <Comment key={item.id} commentObj={item} isOwner={item.uid === userId} />
        )
        )}
      </ListGroup>
    </>
  )
}
export default Home;