import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header';
import Home from './pages/home';
import Detail from './pages/detail';
import NoMatch from './pages/404';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
