import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from 'components/registration/Register';
import Login from 'components/registration/Login';
import ToDo from 'components/to-do/Controller';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path='/register/'>
                    <Register />
                </Route>

                <Route path='/login/'>
                    <Login />
                </Route>

                <Route path='/to-dos/'>
                    <ToDo />
                </Route>

                <Route path='/'>
                    <Register />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);