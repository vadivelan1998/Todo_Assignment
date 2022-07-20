import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/">
        <button className="home">Home</button>
      </Link>
      <Link to="/todo">
        <button className="city">Add Todo</button>
      </Link>
      <Link to="signup">
        <button className="country">SignUp</button>
      </Link>
      <Link to="signin">
        <button className="country">SignIn</button>
      </Link>
    </div>
  );
};
