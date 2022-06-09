import React from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { createUserWithEmail, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, resetPassword, signInWithEmail } from './loginManager';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Login = () => {
    const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    signedInUser: false,
    name: '',
    email: '',
    password:'',
    photoURL: '',
    id: '',
    error: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] =useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from }= location.state || { from : {pathname: "/"}};

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  } 
  
  const handleBlur = (event) => {
    let isFieldValid =true;
    if(event.target.name === 'email'){
      isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      isFieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(event.target.value);

    }

    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    // console.log(user.name, user.email, user.password);
    if(newUser && user.email && user.password){
              createUserWithEmail(user.name, user.email, user.password)
              .then(res => {
                handleResponse(res, true);
              })
    }
    if(!newUser && user.email && user.password){
        signInWithEmail(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    event.preventDefault();
  }
  
  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);   
      }
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Start with 42.5(8.30)</h1>
      {
        user.signedInUser ? <button className='btn' onClick={signOut}>Sign out</button>:
        <button className='btn' onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <button className='btn' onClick={fbSignIn}>Log in with FaceBoook</button>
      
      {
        user.signedInUser && <div>
          <h2>Name: {user.name}</h2>
          <h2>Welcome, {user.id}</h2>
          <h4>Your email, {user.email}</h4>
          <img src={user.photoURL} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id='' />
        <label htmlFor='newUser'>New User Sign up</label>
        
        <form  onSubmit={handleSubmit}>
          {newUser && 
          <input className='input'type="text" onBlur={handleBlur} name="name" id="0" placeholder='Your Name'/>
          }        
          <br />
        <input className='input'type="text" onBlur={handleBlur} name="email" id="1" placeholder='Your emai address' required/>
      <br />
      <input className='input'type="password" onBlur={handleBlur} name="password" id="2" placeholder='Passwrod' required/>
      <br />
      <input className='input'type="submit" value={newUser ? 'Sign Up' : 'Sign In'} /> 
      </form>
          <button onClick={() => resetPassword(user.email)}>Reset of Forget Password</button>
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User {newUser ? 'Created': 'logged In'} Successfully</p>}
    </div>
  );
}

export default Login;
