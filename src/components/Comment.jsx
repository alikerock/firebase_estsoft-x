import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from 'react';

const Comment = ({ commentObj, isOwner }) => {
  const [edit, setEdit] = useState(false); //수정모드, 기본값 수정모드x
  const [comment, setComment] = useState(commentObj.comment)//수정글

  const handleDelete = async ()=>{
    const deleteConfirm = window.confirm('정말 삭제할까요?');
    if(deleteConfirm){
      await deleteDoc(doc(db, "comments", commentObj.id));
    }
  }
  const toggleEditMode = ()=>{
    setEdit(prev=>!prev);
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const commentRef = doc(db, "comments", commentObj.id);
    await updateDoc(commentRef, {
      comment: comment
    });
    setEdit(false);
  }
  const handleChange = (e) => {
    setComment(e.target.value);
  }
  return (
    <ListGroup.Item>      
        {
          edit ?           
          <Form className="mt-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="comment">             
              <Form.Control as="textarea" rows={3} value={comment} onChange={handleChange} />
            </Form.Group>
            <div className='d-flex justify-content-end gap-1'>
              <Button type="submit" variant="primary" size="sm">입력</Button>
              <Button type="button" variant="secondary" size="sm" onClick={toggleEditMode}>취소</Button>
            </div>
          </Form>   
          : 
          <div className='d-flex justify-content-between align-items-center'>
            {commentObj.comment}
            {commentObj.image && <img src={commentObj.image} alt="" width="50px" height="50px" />}
            {
              isOwner && <div className='d-flex gap-1'>
                <Button variant="secondary" size="sm" onClick={toggleEditMode}>수정</Button>
                <Button variant="danger" size="sm" onClick={handleDelete}>삭제</Button>
              </div>
            } 
          </div>                
        }      
    </ListGroup.Item>
  )
}
export default Comment;