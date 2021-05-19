import './App.css';
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import File from "./Components/File";
import Production from "./Components/Production";
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={HomePage} />
            <Route exact path="/File" component={File} />
            <Route exact path="" component={Production} />
          </Switch>
        </Router>
      </header>
      <Footer/>
    </div>
  );
}

export default App;
