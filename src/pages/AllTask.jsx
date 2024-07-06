import React from 'react'
import Card from '../components/Card'
import { IoAddCircle } from "react-icons/io5";
import InputData from '../components/InputData';
import { useState ,useEffect} from 'react';
import axios from 'axios';
function AllTask() {
  const [InputDiv,setinputDiv]=useState("hidden");
  const [Data,setData] = useState();
  const [updatedData, setupdatedData] = useState({id:"",title:"",desc:""});
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`};
  useEffect(()=>{
    try {
      const fetch = async ()=>{
        const response = await axios.get("http://localhost:3000/api/v2/get_all_tasks",
          {headers,}
        );
        setData(response.data.data);
      }
      if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
      }
      
    } catch (error) {
      console.log(error);
    }
  },[Data])
  return (
    <>
    <div>
        <div className='w-full flex justify-end px-4 py-2'>
            <button onClick={()=> setinputDiv("fixed")}>
            <IoAddCircle className='text-5xl text-gray-300 hover:text-gray-100 cursor-pointer'/>
            </button>
            
        </div>
        {Data && <Card home={"true"} setinputDiv={setinputDiv} data={Data.tasks} setupdatedData={setupdatedData}/>}
    </div>
    <InputData InputDiv={InputDiv} setinputDiv={setinputDiv} updatedData={updatedData} setupdatedData={setupdatedData}/>
    </>
  )
}

export default AllTask