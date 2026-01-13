import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { authService } from '../firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const auth = authService;
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [input, setInput] = useState({ email: '', password: '' });
  const [newAccount, setNewAccount] = useState(true); //회원가입,로그인 구분할 변수, 기본값은 회원가입 true

  const handleChange = (e) => {
    /*
    console.log(e.target.name);
    console.log(e.target.value);
    let name = e.target.name;
    let value = e.target.value
    const {name, value} = e.target;

    if(name === 'email'){
      setInput(value);
    }else{
      setInput(value)
    }
    */
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAccount) {
      //회원가입 진행
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      //로그인 진행
    }
  }
  return (
    <>
      <h2>{newAccount ? '회원가입' : '로그인'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userPW">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary">{newAccount ? '회원가입' : '로그인'}</Button>
      </Form>
    </>
  )
}
export default Auth;