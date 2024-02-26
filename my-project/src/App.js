import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';import './App.css';
import {Index} from './authViews/Index';

function App() {
  return (
    <div className="App">
      <Index />
    </div>
  );
}

export default App;
