import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from './pages/user/Signup.js';
import { Login } from './pages/user/Login.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
