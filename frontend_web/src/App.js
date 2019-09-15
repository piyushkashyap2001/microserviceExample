import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import OrderList from "./components/order-list.component";
import EditOrder from "./components/edit-order.component";
import CreateOrder from "./components/create-order.component";
import CreateBook from "./components/create-book.component";
import BookList from "./components/book-list.component";
import EditBook from "./components/edit-book.component";
import CreateCustomer from "./components/create-customer.component";
import CustomerList from "./components/customer-list.component";
import EditCustomer from "./components/edit-customer.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={OrderList} />
        <Route path="/editorder/:id" component={EditOrder} />
        <Route path="/createorder" component={CreateOrder} />
        <Route path="/book" exact component={BookList} />
        <Route path="/createbook" exact component={CreateBook} />
        <Route path="/editbook/:id" component={EditBook} />
        <Route path="/customer" component={CustomerList} />
        <Route path="/createcustomer" exact component={CreateCustomer} />
        <Route path="/editcustomer/:id" component={EditCustomer} />
      </div>
    </Router>
  );
}

export default App;
