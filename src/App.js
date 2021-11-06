import Main from './features/Main/Main';
import { Switch, Route } from 'react-router-dom';
import Productlist from './features/ProductList/ProductList';
import Create from './features/Register/Register';
import ProductDetail from './features/ProductDetail/ProductDetail';
import History from './features/History/History';
function App() {
  return (
    <Switch>
      <Route path="/productList/" component={Productlist} />
      <Route path="/create/" component={Create} />
      <Route path="/history/" component={History} />
      <Route exact path="/detail/:id" component={ProductDetail} />
      <Route path="/" exact component={Main} />
    </Switch>
  );
}

export default App;
