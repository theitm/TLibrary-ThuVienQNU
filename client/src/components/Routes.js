import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import BookPage from './pages/admin/BookPage'
import SearchHome from '../components/pages/SearchHome';
import Result from '../components/pages/ResultPage2';
import managePage from './pages/admin/managePage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>        
        <Route path='/' exact component={SearchHome}/>
        <Route path='/rs' exact component={Result} />
        <Route path='/rs/:kw' exact component={Result} />
        <Route path='/manager' exact component={managePage}/>
      </Switch>
      
    );
  }
}

export default Routes;
