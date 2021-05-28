
import './App.css';
import {Switch,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Productlist from './components/Productlist';
import Details from './components/Details';
import Cart from './components/cart/Cart';
import  Default from './components/Default';
import Modal from './components/Modal'

import React, { Component } from 'react'

 class App extends Component {
  render() {
    return (
     <React.Fragment>
       <Navbar/>
       <Switch>
        <Route exact path="/" component={Productlist}/>
         <Route path="/details" component={Details}/>
         <Route path="/cart" component={Cart}/>
         
         <Route component={Default}/>
          
       </Switch>
       <Modal/>
       
     </React.Fragment>
    )
  }
}



export default App;






