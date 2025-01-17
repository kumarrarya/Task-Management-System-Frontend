import React from "react";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
function CompletedTask() {
  const [Data, setData] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await axios.get(
          "https://task-management-system-backend-9p9j.onrender.com/api/v2/get_comp_tasks",
          { headers }
        );
        setData(response.data.data);
      };
      fetch();
    } catch (error) {
      setData([])
      console.log(error);
    }
  }, [Data]);
  // console.log(Data);
  return (
    <div>
      <Card home={"false"} data={Data} />
    </div>
  );
}

export default CompletedTask;
