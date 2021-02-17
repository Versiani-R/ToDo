import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Routes */
import Register from 'components/registration/Register';
import Login from 'components/registration/Login';
import ToDo from 'components/toDo/ToDo';

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

                <Route path='/toDos/'>
                    <ToDo />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);