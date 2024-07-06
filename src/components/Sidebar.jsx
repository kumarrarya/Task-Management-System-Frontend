import React, { useEffect, useState } from "react";
import { BiTask, BiTaskX,} from "react-icons/bi";
import { MdLabelImportant } from "react-icons/md";
import { MdOutlineTask } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Sidebar() {
  const dispatch =useDispatch();
  const history= useNavigate();
  const data = [
    {
      title: "All Task",
      icon:<BiTask/>,
      link:"/"
    },
    {
      title: "Important Task",
      icon:<MdLabelImportant/>,
      link:"/Importanttask"
    },
    {
      title: "Completed Task",
      icon:<MdOutlineTask/>,
      link:"/completedtask"
    },
    {
      title: "incompleted Task",
      icon:<BiTaskX/>,
      link:"/incompletedtask"
    },
  ];
  const [Data,setData] = useState()
  const logout = ()=>{
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  }
  const headers = {
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`};
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("https://task-management-system-backend-9p9j.onrender.com/pi/v2/get_all_tasks",{
        headers,
      });
      setData(response.data.data);
    }
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  },[Data])
  return (
    <>
      {Data && (
        <div>
        <h2 className="text-xl font-semibold">{Data.username}</h2>
        <h4 className="mb-2 text-gray-400">{Data.email}</h4>
        <hr />
      </div>
      )}
      <div>
        {data.map((item, index) => (
          <Link to={item.link} className="my-2 flex items-center gap-3 hover:bg-black cursor-pointer rounded p-2 transition-all duration-300" key={index}>
            {item.icon}
            {item.title}
            </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 border rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
