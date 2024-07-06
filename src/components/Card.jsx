import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
function Card({home, setinputDiv , data, setupdatedData}) {
   
    // console.log(data);
    const headers = {
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`
    };
    const handleCompleteTask = async (id)=> {
    try {
        console.log("id:",id);
        await axios.put(`http://localhost:3000/api/v2/update_com_task/${id}`,
            {},
            {headers}
        );
        // alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleImportant = async (id)=> {
        try {
            const respone=await axios.put(`http://localhost:3000/api/v2/update_imp_task/${id}`,
                {},
                {headers}
            );
            console.log(respone);
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteTask = async(id)=>{
        try {
            const respone=await axios.delete(`http://localhost:3000/api/v2/delete_task/${id}`,
                {headers}
            );
            console.log(respone);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleUpdate = async (id,title,desc)=>{
        setinputDiv("fixed");
        setupdatedData({id: id,title:title,desc:desc});

    }
  return (
    <div className='grid grid-cols-3 gap-4 p-4 h-[30vh]'>
        {Array.isArray(data) && data.length > 0 ? data.map((items,index) => (
            <div key={index} className='flex flex-col justify-between bg-gray-800 rounded-sm p-4 h-64'>
                    <h3 className='text-xl font-semibold'>{items.title}</h3>
                    <p className='text-gray-300'>{items.desc}</p>
                <div className='mt-4 w-full flex items-center justify-evenly'>
                    <button onClick={()=> handleCompleteTask(items._id)} 
                        className={`${(items.completed===false)?"bg-red-400":"bg-green-700"} px-2 py-1 rounded w-1/2`}>
                        {items.completed === true ? "Completed":"In Completed"}
                    </button>
                    <div className='text-white flex justify-around px-2 py-1 w-1/2 text-2xl '>
                        <button onClick={()=> handleImportant(items._id)}>
                            {items.important===false?<CiHeart className='text-2xl'/>:<FaHeart  className='text-red-500 text-1xl'/>}
                        </button>
                        <button onClick={()=> handleUpdate(items._id,items.title,items.desc)}><CiEdit /></button>
                        <button onClick={()=> deleteTask(items._id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
        )):<div></div>}
        {home==="true" && <div className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-2xl font-semibold text-gray-300 hover:scale-105 cursor-pointer transition-all duration-300'>
              <IoAddCircle className='text-5xl' onClick={()=> setinputDiv("fixed")}/>
              <button>Add Task</button>
        </div>}
        
    </div>
  )
}

export default Card