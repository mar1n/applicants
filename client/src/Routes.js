import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import ApplicantEdit from "./core/ApplicantEdit";
import ApplicantAdd from "./core/ApplicantAdd";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private" exact component={Private} />
                <PrivateRoute path="/applicantEdit/:id" exact component={ApplicantEdit} />
                <PrivateRoute path="/applicantAdd" exact component={ApplicantAdd} />
                <AdminRoute path="/admin" exact component={Admin} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;