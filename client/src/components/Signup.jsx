import { useState } from "react";
import axios from "axios"
export const Signup = () => {
  const [user, setUser] = useState({});
  console.log(user)
  const handle = (e) => {
    e.preventDefault()
   axios.post("http://localhost:5000/signup", user);

  };
    const getInput = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    };
  return (
    <div>
      <form onSubmit={handle}>
        <input
          onChange={getInput}
          type="text"
          name="name"
          id=""
          placeholder="Enter name"
        />
        <br />
        <input
          onChange={getInput}
          type="email"
          name="email"
          id=""
          placeholder="Enter email"
        />
        <br />
        <input
          onChange={getInput}
          type="text"
          name="phone"
          id=""
          placeholder="Enter phone"
        />
        <br />
        <input
          onChange={getInput}
          type="text"
          name="password"
          id=""
          placeholder="Password"
        />
        <br />
        <input value="signUp" type="submit" name="" id="" />
      </form>
    </div>
  );
};
