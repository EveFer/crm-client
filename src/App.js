import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// Layouts
import Header from './components/layout/Header'
import Nav from './components/layout/Nav'
// Components
import Orders from './components/orders/Orders'

import Clients from './components/clients/Clients'
import NewClient from './components/clients/NewClient'
import EditClient from './components/clients/EditClient'

import Products from './components/products/Products'
import NewProduct from './components/products/NewProduct'
import EditProduct from './components/products/EditProduct'

function App() {
  return (
    <Router>
      <Fragment>
        <Header/>
        <div className="grid contenedor contenido-principal">
          <Nav/>
          <main className="caja-contenido col-9">
            {/* // TODO: Routing a los diferentes componentes */}
            <Switch>
              <Route exact path="/" component={Clients}></Route>
              <Route exact path="/clientes/nuevo" component={NewClient}></Route>
              <Route exact path="/clientes/editar/:id" component={EditClient}></Route>

              <Route exact path="/productos" component={Products}></Route>
              <Route exact path="/productos/nuevo" component={NewProduct}></Route>
              <Route exact path="/productos/editar/:id" component={EditProduct}></Route>

              <Route exact path="/pedidos" component={Orders}></Route>
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
