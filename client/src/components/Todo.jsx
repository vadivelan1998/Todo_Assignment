import { useState } from "react";

import axios from "axios";

export const Todo = () => {
  const [todo, setTodo] = useState({});
  console.log(todo);
  const handle = (e) => {
    e.preventDefault();
    let userId=localStorage.getItem("userId")
    axios.post("http://localhost:5000/todo", {...todo,userId:userId}).then((res) => {
     
    });
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };
  return (
    <div>
      <form onSubmit={handle}>
        <input
          onChange={getInput}
          type="text"
          name="title"
          id=""
          placeholder="Enter Todo"
        />
        <br />
        <input
          onChange={getInput}
          type="date"
          name="date"
          id=""
          placeholder="Enter expiry"
        />
     
       
        <br />
        <input value="Add Todo" type="submit" name="" id="" />
      </form>
    </div>
  );
};
