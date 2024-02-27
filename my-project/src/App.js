import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { Index } from "./authViews/Index";

function App() {
  return (
    <Router>
        <div className="App">
          <Index />
        </div>
    </Router>
  );
}

export default App;
