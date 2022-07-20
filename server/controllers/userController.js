const User = require("../models/userModel");

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

// get all user details function ----------------------------------------------------------

async function getUsers(req, res) {
  try {
    const user = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// create a user or user signup  function ----------------------------------------------------------

async function createUser(req, res) {
  try {
    const body = await getPostData(req);
    let result = signupValidator(body);
    if (!result.status) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: result.error }));
      return;
    }
    const { name, email, password ,phone} = JSON.parse(body);

    result = await User.findByPhone(phone);

    if (!!result) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: " Phone Number Already Exists " }));
      return;
    }

    const user = {
      name,
      email,
      password: hashPassword(password),
      phone
    };

    const newUser = await User.create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone:newUser.phone
      })
    );
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// user details modifying function ----------------------------------------------------------

async function updateUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getPostData(req);
      const result = patchValidator(body);
      if (!result.status) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: result.error }));
        return;
      }
      const { name, email, password,phone } = JSON.parse(body);

      const userData = {
        name: name || user.name,
        email: email || user.email,
        phone:phone||user.phone,
        password: (password ? hashPassword(password) : false) || user.password,
      };

      const updateduser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          id: updateduser.id,
          name: updateduser.name,
          email: updateduser.email,
          phone:updateUser.phone
        })
      );
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// user details delete function ----------------------------------------------------------

async function deleteUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

// user login function ----------------------------------------------------------

async function loginUser(req, res) {
  try {
    const body = await getPostData(req);
    let result = loginValidator(body);
    if (!result.status) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: result.error }));
      return;
    }

    const { email, password } = JSON.parse(body);
    const user = await User.findByEmail(email);

    if (!user) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Check Your Email or Please SignUp" }));
    } else if (user.password != hashPassword(password)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Check Your Password" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ id: user.id, name: user.name, email: user.email ,phone:user.phone})
      );
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

module.exports = {
  getWelcomeGreet,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
