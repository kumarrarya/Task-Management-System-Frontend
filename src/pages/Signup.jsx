import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from './Login';
import axios from "axios";
import { useSelector } from 'react-redux';
function Signup() {
  const history = useNavigate();
  const [Data,setData] = useState({username:"",email:"",password:""});
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  if(isLoggedIn===true){
    history("/");
  }
  const change = (e)=>{
    const { name, value } = e.target;
    setData({...Data,[name]:value});
  }
  const submit = async ()=>{
    if(Data.username===""||Data.email===""||Data.password===""){
      alert("All fields are Required");
      
    }
    else{
      try {
        const response = await axios.post("http://localhost:3000/api/v1/sign-in", Data);
        alert(response.data.message);
        setData({username:"",email:"",password:""});
        history("/login");
      } catch (error) {
        alert(error.response.data.message);
      }
    }

  }
  return (
    <>
      <div className='w-full h-full flex justify-center items-center h-[98vh]'>
            <div className='bg-gray-800 w-2/6 p-4 rounded'>
                <div className='text-2xl font-semibold'>Sign up</div>
                <input 
                    type="text" 
                    placeholder='username' 
                    name='username' 
                    className='my-3 p-2 w-full font-semibold rounded text-white bg-gray-600'
                    value={Data.username}
                    onChange={change}
                    
                />
                <input 
                    type="email" 
                    placeholder='email' 
                    name='email' 
                    className='my-3 p-2 w-full font-semibold rounded text-white bg-gray-600'
                    value={Data.email}
                    onChange={change}
                    required
                    
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    name='password' 
                    className='my-3 p-2 w-full font-semibold rounded text-white bg-gray-600'
                    required
                    value={Data.password}
                    onChange={change}
                    
                />
                <div className='flex justify-between items-center'>
                    <button className='bg-blue-500 px-2 py-1 my-3 font-semibold rounded' onClick={submit}>Sign up</button>
                    <Link to="/Login" className='text-gray-400 px-2 py-1 my-3 rounded font-semibold hover:text-gray-500'>Already have an Account? LogIn here</Link>
                </div>
               
            </div>
      </div>
    </>
  )
}

export default Signup