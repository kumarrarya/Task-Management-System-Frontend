import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch ,useSelector} from 'react-redux';
function Login() {
  const history = useNavigate();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  if(isLoggedIn===true){
    history("/");
  }
  const [Data,setData] = useState({username:"",password:""});   
  const dispatch = useDispatch();
  const change = (e)=>{
    const { name, value } = e.target;
    setData({...Data,[name]:value});
  }
  const submit = async ()=>{
    if(Data.username === ""||Data.password === ""){
      alert("All fields are Required");
    }
    else{
      try {
        const response = await axios.post("http://localhost:3000/api/v1/log-in", Data);
        console.log("response:",response);
        setData({username:"",password:""});
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        dispatch(authActions.login());
        history("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  }    
  return(
    <>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='bg-gray-800 w-2/6 p-4 rounded'>
                <div className='text-2xl font-semibold'>LogIn</div>
                <input type="text" 
                  placeholder='Username' 
                  name='username'
                  className='my-3 p-2 w-full font-semibold rounded text-white bg-gray-600'
                  value={Data.username}
                  onChange={change}
                />

                <input type="password" 
                  placeholder='Password' 
                  className='my-3 p-2 w-full font-semibold rounded text-white bg-gray-600'
                  name='password'
                  value={Data.password}
                  onChange={change}
                />
                <div className='flex justify-between'>
                    <button className='bg-blue-500 px-2 py-1 my-3 rounded font-semibold' onClick={submit}>LogIn</button>
                    <Link to="/SignUp" className='text-gray-400 px-2 py-1 my-3 rounded font-semibold hover:text-gray-500'>   Not Having Account? SingUp here </Link>
                </div>
            </div>
        </div>
    </>
  )
}
export default Login