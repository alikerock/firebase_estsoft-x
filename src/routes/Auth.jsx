import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { authService } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const Auth = () => {
  const auth = authService;
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [input, setInput] = useState({ email: '', password: '' });
  const [newAccount, setNewAccount] = useState(true); //회원가입,로그인 구분할 변수, 기본값은 회원가입 true
  const [error, setError] = useState(''); //에러문구

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
      console.log('회원가입 진행');
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(() => {
          // 회원가입 완료 후 
          // const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(errorMessage);
        });
    } else {
      //로그인 진행  
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then(() => {
          // 로그인 완료 후 
          // const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  }
  const toggleAccount = () => {
    setNewAccount(prev => !prev)
  }
  const onGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        setError(errorMessage);
      });
  }
  const onGithubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;    
        const user = result.user; 
        console.log(token,user);
      }).catch((error) => {
        const errorMessage = error.message;
        const email = error.customData?.email;

        if(error.code === "auth/account-exists-with-different-credential"){
            if(email){
              alert(`이미 가입된 이메일 주소가 있습니다.\n\n이메일:${email}\n\n 해당 이메일로 로그인을 해주세요`);
            }else{
               alert(`이미 다른 방식으로 가입한 계정이 있습니다.\n\n 해당 이메일 확인후 로그인해주세요`);
            }
        }
        
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(email, credential)
        setError(errorMessage);
        // ...
      });
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
        <Button type="submit" variant="primary">{newAccount ? '회원가입' : '로그인'}</Button>
        {error && <div>{error}</div>}
      </Form>
      <hr />
      <div className="d-flex justify-content-center gap-1">
        <Button variant="info" onClick={onGoogleSignIn}>{newAccount ? 'Google 회원가입' : 'Google 로그인'}</Button>
        <Button variant="info" onClick={onGithubSignIn}>{newAccount ? 'Github 회원가입' : 'Github 로그인'}</Button>
      </div>
      <hr />
      <div className="text-center">
        <Button type="submit" variant="secondary" onClick={toggleAccount}>
          {newAccount ? '로그인으로 전환' : '회원가입으로 전환'}
        </Button>
      </div>
    </>
  )
}
export default Auth;