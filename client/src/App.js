
import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import { Todo } from './components/Todo';
import {Signup} from "./components/Signup"
import { Signin } from './components/Signin';
import { Home } from './components/Home';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/todo" element={<Todo></Todo>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
      </Routes>
    </div>
  );
}

export default App;
