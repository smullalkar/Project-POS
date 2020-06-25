import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Home from '../Components/common/Home';
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import StockInventory from '../Components/stock/StockInventory'
import Supplier from '../Components/supplier/Supplier';
import Addsupplier from '../Components/supplier/Addsupplier';
import DeleteSupplier from '../Components/supplier/DeleteSupplier';
import Customer from '../Components/customer/Customer';
import AddStock from '../Components/stock/AddStock';
import DeleteStock from '../Components/stock/DeleteStock';
import Homeredirect from '../Components/common/Homeredirect';
import EditSupplier from '../Components/supplier/EditSupplier';
import EditStock from '../Components/stock/EditStock';
import Bill from '../Components/bill/Bill';
import Invoice from '../Components/bill/Invoice';
import CustomerInvoice from '../Components/customer/CustomerInvoice';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route exact path='/' component={Homeredirect}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    
                    <Route exact path='/user/stockinventory' component={StockInventory}></Route>
                    <Route path='/user/stockinventory/add' component={AddStock}></Route>
                    <Route path='/user/stockinventory/delete/:id' component={DeleteStock}></Route>
                    <Route path='/user/stockinventory/edit/:id' component={EditStock}></Route>

                    <Route exact path='/user/supplier' component={Supplier}></Route>
                    <Route path='/user/supplier/add' component={Addsupplier}></Route>
                    <Route path='/user/supplier/delete/:id' component={DeleteSupplier}></Route>
                    <Route path='/user/supplier/edit/:id' component={EditSupplier}></Route>

                    <Route exact path='/user/customer' component={Customer}></Route>
                    <Route path='/user/customer/:id' component={CustomerInvoice}></Route>
                    <Route path='/user/bill' component={Bill}></Route>
                    <Route path='/user/invoice' component={Invoice}></Route>
                    {/* <Route path='/users/listing/show/:id' exact component={UserDetails}></Route>
                    <Route path='/users/listing/show/:id/edit/:id' component={EditUser}></Route>
                    <Route path='/users/listing/show/:id/delete/:id' component={DeleteUser}></Route>
                    <Route path='/users/create' component={AddUsers}></Route> */}
                </Switch>
            </div>
        )
    }
}
