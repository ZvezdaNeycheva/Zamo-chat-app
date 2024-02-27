import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { Index } from "./authViews/Index";
import { RecoverPassword } from "./authViews/RecoverPassword";
import { LockScreen } from "./authViews/LockScreen";
import { Login } from "./authViews/Login";
import { Register } from "./authViews/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lock-screen" element={<LockScreen />} />
        <Route path="/recover" element={<RecoverPassword />} />
      </Routes>
        <div className="App">
          <Index />
        </div>
    </Router>
  );
}

export default App;
