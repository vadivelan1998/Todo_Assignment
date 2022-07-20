const http = require("http");

const {
  getWelcomeGreet,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("./controllers/userController");

const {getTodos,createTodo,updateTodo}=require("./controllers/todoController")



const PORT = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
  // res.writeHead("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Request-Method", "*");
  // res.setHeader("Access-Control-Allow-Methods", "PUT,DELETE,UPDATE, GET,PATCH");
  // res.setHeader("Access-Control-Allow-Headers", "*");
  // if (req.method === "OPTIONS") {
  //   res.writeHead(200);
  //   res.end();
  //   return;
  // }
  //app.use(cors())
  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  //   "Access-Control-Max-Age": 2592000, // 30 days
  //   /** add other headers as per requirement */
  // };
  //res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    // let headers = new Headers();

    // headers.append("Content-Type", "application/json");
    // headers.append("Accept", "application/json");

    // headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    // headers.append("Access-Control-Allow-Credentials", "true");

    // headers.append("GET", "POST", "OPTIONS");

  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH",
  //   "Access-Control-Allow-Headers":
  //     "Origin, X-Requested-With, Content-Type, Accept",
  // };

  if (req.url === "/" && req.method === "GET") {
    getWelcomeGreet(req, res);
  } else if (req.url === "/signup" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url === "/signup" && req.method === "POST") {
    createUser(req, res);
  } else if (
    req.url.match(/\/signup\/\w+/) &&
    (req.method === "PATCH" || req.method === "PUT")
  ) {
    const id = req.url.split("/")[2];
    updateUser(req, res, id);
  } else if (req.url.match(/\/signup\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    deleteUser(req, res, id);
  } else if (req.url === "/login" && req.method === "POST") {
    loginUser(req, res);
  }

  //todo
  else if (req.url.match(/\/todo\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    getTodos(req, res, id);
  } else if (req.url === "/todo" && req.method === "POST") {
    createTodo(req, res);
  } else if (req.url.match(/\/todo\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[2];
    updateTodo(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});
server.listen(PORT, async() => console.log(`Server running on port ${PORT}`));

module.exports = server;
