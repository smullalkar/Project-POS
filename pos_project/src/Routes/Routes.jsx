import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import Home from '../Components/common/Home';
import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';


export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    {/* <Route path='/users/listing/show/:id' exact component={UserDetails}></Route>
                    <Route path='/users/listing/show/:id/edit/:id' component={EditUser}></Route>
                    <Route path='/users/listing/show/:id/delete/:id' component={DeleteUser}></Route>
                    <Route path='/users/create' component={AddUsers}></Route> */}
                </Switch>
            </div>
        )
    }
}
