import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from "react";
import AppRouter from './Router';
import {authService} from '../firebase.js';
console.log(authService.currentUser);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='container'>
      <h1 className='text-center'>ESTSOFT - X</h1>
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  )
}

export default App
