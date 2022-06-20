import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ThemeProvider, useThemeContext } from './context/theme-context';
import Header from './components/header/header';
import Home from './pages/home';
import Detail from './pages/detail';
import NoMatch from './pages/404';

const App = (): JSX.Element => {
  const { dark } = useThemeContext();

  return (
    <ThemeProvider>
      <div className={'app ' + (dark ? 'dark-theme' : 'light-theme')}>
        <Header />
        <main role="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/detail/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
