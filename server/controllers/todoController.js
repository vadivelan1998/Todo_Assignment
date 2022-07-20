const Todo = require("../models/todoModel");

const {
  getPostData,
  hashPassword,
  signupValidator,
  loginValidator,
  patchValidator,
} = require("../utils");

// welcome greet function ----------------------------------------------------------

async function getWelcomeGreet(req, res) {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `welcome to neos-healthcare backend (server)`,
        author: "S S Vadivelan",
        routes_signup: {
          GET: "/signup",
          POST: "/signup",
          PATCH_or_PUT: " /signup/:id",
          DELETE: "signup/:id",
        },
        routes_login: {
          POST: "/login",
        },
        singup_body: {
          name: "demo",
          email: "demo@gmail.com",
          password: "0123456",
        },
        login_body: {
          email: "demo@gmail.com",
          password: "0123456",
        },
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// get all todo details function ----------------------------------------------------------

async function getTodos(req, res,id) {
  try {
    const todo = await Todo.findAll(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// create a todo  function ----------------------------------------------------------

async function createTodo(req, res) {
  try {
    const body = await getPostData(req);

    const { title,userId ,time} = JSON.parse(body);

    const todo = {
     title,userId,time
    };

    const newTodo = await Todo.create(todo);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        id: newTodo.id,
       title:newTodo.title,
       userId:newTodo.userId,
       time:newTodo.time
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// todo details modifying function ----------------------------------------------------------

async function updateTodo(req, res, id) {
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found" }));
    } else {
      const { title,userId,time } = JSON.parse(body);

      const todoData = {
       
        title: title || todo.title,
        time: time || todo.time,
        
      };

      const updatedtodo = await Todo.update(id, todoData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          id: updatedtodo.id,
          title: updatedtodo.title,
         time:updatedtodo.time
        })
      );
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// todo delete function ----------------------------------------------------------

async function deleteTodo(req, res, id) {
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await Todo.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Todo ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}



module.exports = {
  getWelcomeGreet,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
 
};
