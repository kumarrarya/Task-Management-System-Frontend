import { useEffect, useState } from 'react'
import Form from './components/Form'
import Home from './components/Home'
import AllTask from './pages/AllTask'
import ImportantTask from './pages/ImportantTask'
import CompletedTask from './pages/CompletedTask'
import {BrowserRouter as Router,Routes,Route, useNavigate} from "react-router-dom"
import './App.css'
import IncompletedTask from './pages/IncompletedTask'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from './store/auth'
function App() {
  // const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("id")&&(localStorage.getItem("token"))){
      dispatch(authActions.login());
    }
    else if(!isLoggedIn){
      navigate("/signup");
    }
    },[])
  return (
    <>
      <div className='bg-gray-700 text-white h-screen p-2 relative'>
        
          <Routes>
            <Route path='/' element={<Home/>}>
               <Route index element={<AllTask/>}/>
               <Route path='ImportantTask' element={<ImportantTask/>}/>
               <Route path='completedtask' element={<CompletedTask/>}/>
               <Route path='incompletedtask' element={<IncompletedTask/>}/>
            </Route>
            <Route path='Signup' element={<Signup/>}/>
            <Route path='Login' element={<Login/>}/>
          </Routes>
      </div>
        
    </>
  )
}

export default App
