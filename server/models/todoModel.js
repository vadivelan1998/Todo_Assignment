let todos = require("../todos.json");

const { writeDataToFile } = require("../utils");

const path = require("path");

// getting data or readFile function from todos.json files  ----------------------------------------------------------

function findAll(id) {
  return new Promise((resolve, reject) => {
    todos=todos.filter((ele)=>ele.userId===id)
    resolve(todos);
  });
}

// creating  data or writeFile function in todos.json files function   ----------------------------------------------------------

function create(todo) {
  return new Promise((resolve, reject) => {
    const newTodo = { id: String(Date.now()), ...todo};
    todos.push(newTodo);
    writeDataToFile(path.join(__dirname, "../todos.json"),todos);
    resolve(newTodo);
  });
}

// finding user id function from todos.json files   ----------------------------------------------------------

function findById(id) {
  return new Promise((resolve, reject) => {
    const todo = todos.find((ele) => ele.id === id);
    resolve(todo);
  });
}

//  updating  data or writeFile function in todos.json files   ----------------------------------------------------------

function update(id, todo) {
  return new Promise((resolve, reject) => {
    const index = todos.findIndex((ele) => ele.id === id);
    todos[index] = { id, ...todo };
    writeDataToFile(path.join(__dirname, "../todos.json"), todos);
    resolve(todos[index]);
  });
}

//  removing  data or writeFile function in todos.json files   ----------------------------------------------------------

function remove(id) {
  return new Promise((resolve, reject) => {
    let index = null;
    users.forEach((ele, ind) => {
      if (ele.id === id) {
        index = ind;
      }
    });
    users.splice(index, 1);
    writeDataToFile(path.join(__dirname, "../todos.json"), users);
    resolve();
  });
}

module.exports = {
  findAll,
  create,
  findById,
  update,
  remove,
};
