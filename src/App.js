import Main from "./features/Main/Main";
import { Switch, Route } from "react-router-dom";
import Productlist from "./features/ProductList/ProductList";
import Create from "./features/Register/Register";
import ProductDetail from "./features/ProductDetail/ProductDetail";
import History from "./features/History/History";
import UserCollection from "./features/UserCollection/UserCollection";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Switch>
        <Route path="/productList/" component={Productlist} />
        <Route path="/create/" component={Create} />
        <Route path="/history/" component={History} />
        <Route path="/userCollection/:id" component={UserCollection} />
        <Route exact path="/detail/:id" component={ProductDetail} />
        <Route path="/" exact component={Main} />
      </Switch>
      </Web3ReactProvider>
  );
}

export default App;
