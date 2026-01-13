import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useEffect, useState } from "react";
import AppRouter from './Router';
import {authService} from '../firebase.js';
import {onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false); //초기화 메시지 출력 여부
  const auth = authService;

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {//로그인된 유저 정보가 있다면
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);//초기화(유정 정보 파악) 끝
    });    
  }, []); //최초 한번 실행

  

  return (
    <div className='container'>
      <h1 className='text-center'>ESTSOFT - X</h1>
      {
        init ? 
        <AppRouter isLoggedIn={isLoggedIn}/>
        :
        '초기화 중입니다.'
      }
      
    </div>
  )
}

export default App
