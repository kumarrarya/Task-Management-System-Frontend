import React from 'react'
import Card from '../components/Card'
import { useState, useEffect } from 'react';
import axios from 'axios';
function ImportantTask() {
  const [Data, setData] = useState([])
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  };
  useEffect(()=>{
    try {
      const fetch = async ()=>{
        const response = await axios.get("http://localhost:3000/api/v2/get_imp_tasks",
          {headers,}
        );
        setData(response.data.data);
      }
      fetch();
    } catch (error) {
      // setData([])
      console.log(error);
    }
  },[Data])
  // console.log(Data);
  return (
    <div><Card home={"false"} data={Data.tasks}/></div>
  )
}

export default ImportantTask