import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PeopleUI from './PeopleUI';
import RegisterAndLogin from './RegisterAndLogin';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/register' component={RegisterAndLogin} />
          <Route path='/' component={PeopleUI} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
