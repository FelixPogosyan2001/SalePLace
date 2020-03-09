import React from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import {Header} from './Header';
import {Private} from  './Private';
import Profile from './Profile/Profile';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import Favorites from './Favorites';
import SearchPage from './Search/SearchPage';
import Landing from './Landing';
import {Footer} from './Footer';
import {ErrorBoundary} from './Errors/ErrorBoundary';
import {AppProps} from '../additional/interfaces';
import '../css/App.scss';

const App: React.FC<AppProps> = ({ token, logout }) => {
  return (
    <BrowserRouter>
        <Header token={token} logout={logout} />
        <div id='content'>
          <ErrorBoundary>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/products' component={Products} />
              <Route path='/cart' component={Cart} />
              <Route path='/favorites' component={Favorites} />
              <Route path='/search' component={SearchPage} />                                    
              {!token && <Route path='/authentication' component={Private} />}
              {token && <Redirect from="/authentication" to='/profile' exact />}
              {token && <Route path='/profile' component={Profile} />}
              {!token && <Redirect to='/' exact />}
            </Switch>
          </ErrorBoundary>
          <Footer token={token} />
        </div>
    </BrowserRouter>
  );
}

export default App;
