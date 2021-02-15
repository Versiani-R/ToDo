import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Routes */
import Register from './routes/register';
import Login from './routes/login';
import ToDo from './routes/toDo';

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

                <Route path='/toDo/'>
                    <ToDo />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);