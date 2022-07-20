import { useState } from "react";

import axios from "axios"

 export const Signin = () => {
     const [user, setUser] = useState({});
     console.log(user);
     const handle = (e) => {
       e.preventDefault();
       axios.post("http://localhost:5000/login", user).then((res)=>{
        localStorage.setItem("userId",res.data.id)
       });
     };
     const getInput = (e) => {
       const { name, value } = e.target;
       setUser({ ...user, [name]: value });
     };
   return (
     <div>
       <form onSubmit={handle}>
         
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
           name="password"
           id=""
           placeholder="Password"
         />
         <br />
         <input value="signIn" type="submit" name="" id="" />
       </form>
     </div>
   );
 };