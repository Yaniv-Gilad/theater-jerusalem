import './App.css';
import Login from "./Components/login";
import NewPage from "./Components/newPage";
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/newPage" component={NewPage} />
          </Switch>
        </Router>
        { /* <Login />
        <NewPage /> */ }
      </header>
    </div>
  );
}

export default App;
