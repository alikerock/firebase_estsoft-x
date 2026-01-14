import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

const Comment = ({ commentObj, isOwner }) => {
  
  const handleDelete = async ()=>{
    const deleteConfirm = window.confirm('정말 삭제할까요?');
    if(deleteConfirm){
      await deleteDoc(doc(db, "comments", commentObj.id));
    }
  }

  return (
    <ListGroup.Item>
      <div className='d-flex justify-content-between'>
        {commentObj.comment}
        {
          isOwner && <div className='d-flex gap-1'>
            <Button variant="secondary" size="sm">수정</Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>삭제</Button>
          </div>
        }        
      </div>
    </ListGroup.Item>
  )
}
export default Comment;