import React from 'react'
import './App.css';
// routes
import Routes from './routes'

import { BrowserRouter as Router, Switch } from 'react-router-dom'

export default function () {

  return (
    <div className="App">
      <Router>
        <Switch>
          {Routes()}
        </Switch>
      </Router>
    </div>
  );
}

