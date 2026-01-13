import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

const Home = () => {
  const [comment, setComment] = useState(''); //새글 입력
  const [comments, setComments] = useState([]); //모든글 조회
  const handleChange = (e) => {
    setComment(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment,  //comment: comment,
        date: serverTimestamp()
      });
      console.log("새글의 고유 id", docRef.id);
      setComment(''); //입력후 입력칸 비우기
    } catch (e) {
      console.log(e);
    }
  }
  const getComments = async ()=>{
    const querySnapshot = await getDocs(collection(db, "comments"));
    const commentsArray = querySnapshot.docs.map(doc=> ({
      id:doc.id,
      ...doc.data()
    }));
    setComments(commentsArray);
  }
  useEffect(() => {
    getComments();    
  }, []);//최초 한번 실행
  console.log(comments);
  return (
    <>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>새 글을 입력해주세요</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="primary">새글 입력</Button>
      </Form>
      <hr />
      <ListGroup>
        {comments.map(item=>(
            <ListGroup.Item>{item.comment}</ListGroup.Item>
          )
        )}            
      </ListGroup>
    </>
  )
}
export default Home;