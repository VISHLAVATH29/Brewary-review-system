import React, { useState } from 'react';
import "./AuthPage.css"
import { firestore } from '../firebase';
import { addDoc, collection,getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const ref = collection(firestore,"userCred");
  const [userData,setUserData] = useState({name:'',email:'',password:''});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSignup){
      try{
        addDoc(ref,userData);
      }
      catch(e){
        console.log(e);
      }
    }
    else{
      const snapshot = await getDocs(ref);
      snapshot.forEach(
        (doc) =>{
          if(userData.email===doc.data().email && userData.password === doc.data().password){
            const name = doc.data().name;
            sessionStorage.setItem('username',name);
            navigate("/search");
          }
        }
      )
    }
  };
  const handleNameChange = (e) =>{
    const username = e.target.value;
    setUserData((prevData)=>({
      ...prevData,name: username
    }))
  }
  const handleMailChange = (e) =>{
    const userMail = e.target.value;
    setUserData((prevData)=>({
      ...prevData,email: userMail
    }))
  }
  const handlePassChange = (e) =>{
    const userPass = e.target.value;
    setUserData((prevData)=>({
      ...prevData,password: userPass
    }))
  }
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-header">{isSignup ? 'Sign Up' : 'Login'}</h1>
          <form className='form' onSubmit={handleSubmit}>
            <div className="form-group">
              {isSignup && (
                <div>
                <label htmlFor="userName">Name:</label>
              <input 
              value={userData.name} 
              onChange={handleNameChange}
              type="text" 
              id="userName" 
              name="userName" required />
              </div>)}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input 
              value={userData.email}
              onChange={handleMailChange}
              type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
              value={userData.password}
              onChange={handlePassChange}
               type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="submit-btn">
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <button onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
            {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
