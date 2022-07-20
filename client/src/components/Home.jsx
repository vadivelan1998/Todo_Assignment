import { useState,useEffect } from "react";
import axios from "axios"
export const Home=()=>{
    const [todo,settodo]=useState([])
    useEffect(()=>{
axios.get("http://localhost:5000/todo").then((res)=>{
    settodo(res.data)
});
    },[])
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Todo</th>
              <th>Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((e, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{e.title}</td>
                    <td>{e.time}</td>
                    <td>
                      <button>edit</button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                         
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
}