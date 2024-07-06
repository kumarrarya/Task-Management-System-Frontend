import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
function InputData({InputDiv , setinputDiv, updatedData , setupdatedData}) {
  const [Data, setData] = useState({title:"",desc:""});
  const change = async(e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]:value});
  }
  useEffect(() => {
    setData({title:updatedData.title,desc:updatedData.desc});
  }, [updatedData])
  
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
};
  const submitData = async()=>{
    if(Data.title===""||Data.desc===""){
      alert("All Fields Required");
    }
    else{
      await  axios.post("http://localhost:3000/api/v2/create_task",Data,{headers});
      setData({title:"",desc:""});
      setinputDiv("hidden");
    }
  }
  const updateTask = async ()=>{
    if(Data.title===""||Data.desc===""){
      alert("All Fields Required");
    }
    else{
      await  axios.put(`http://localhost:3000/api/v2/update_task/${updatedData.id}`,Data,{headers});
      setData({title:"",desc:""});
      setupdatedData({
        id:"",
        title:"",
        desc:""
      })
      setinputDiv("hidden");
    }
  }
  return (
    <>
        <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-50 h-full w-full`}></div>
        <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-full w-full`}>
            <div className='w-2/6 bg-gray-900 p-4'>
                <div className='flex justify-end items-center py-1'>
                    <button onClick={()=> {
                      setinputDiv("hidden") 
                      setData({title:"",desc:""})
                      setupdatedData({id:"",title:"",desc:""});
                    }
                    }>
                     <RxCross2 className='text-2xl hover:bg-red-600 rounded cursor-pointer'/>
                    </button>
                    
                </div>
                <input 
                  type="text" 
                  placeholder='Title' 
                  name='title' 
                  className='p-3 w-full rounded bg-gray-600'
                  value={Data.title}
                  onChange={change}
                />
                <textarea
                    name="desc" 
                    cols={30} 
                    rows={10} 
                    placeholder='Description....
                    'className='p-3 w-full rounded text-white bg-gray-600 my-3'
                    value={Data.desc}
                    onChange={change}>
                </textarea>
                { (updatedData.id=== "")?(<button className='px-2 py-1 bg-blue-400 text-black rounded  font-semibold flex justify-center items-center' 
                    onClick={submitData}>
                    Submit
                  </button>):
                  (<button className='px-2 py-1 bg-blue-400 text-black rounded  font-semibold flex justify-center items-center' 
                      onClick={updateTask}>
                      Update
                  </button>)
                }
                  
                  
               
                
            </div>

        </div>
    
    </>
  )
}

export default InputData