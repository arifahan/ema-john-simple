import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Users from './data/data.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetail/ProductDetails';

function App() {
  return (
    <div className='header-section'>
      <Header></Header>
      <h1>38.3</h1>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Manage></Manage>
          </Route>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
          <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
          <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>     
   </div>
  );
}

export default App;
