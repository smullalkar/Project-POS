import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Home from '../Components/common/Home';
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import StockInventory from '../Components/stock/StockInventory'
import Supplier from '../Components/supplier/Supplier';
import Customer from '../Components/customer/Customer';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/user/stockinventory' component={StockInventory}></Route>
                    <Route path='/user/supplier' component={Supplier}></Route>
                    <Route path='/user/customer' component={Customer}></Route>
                    {/* <Route path='/users/listing/show/:id' exact component={UserDetails}></Route>
                    <Route path='/users/listing/show/:id/edit/:id' component={EditUser}></Route>
                    <Route path='/users/listing/show/:id/delete/:id' component={DeleteUser}></Route>
                    <Route path='/users/create' component={AddUsers}></Route> */}
                </Switch>
            </div>
        )
    }
}
