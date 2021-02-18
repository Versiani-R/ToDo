import express from 'express';
import { config } from 'dotenv';
/* import cors from 'cors'; */
/* import path from 'path'; */

/**
    * Configurations
    * It will initiate the app ( express )
    * Call the config function for the dotenv file ( .env )
    * Create the port variable
**/
config();
const app = express();
const PORT = process.env.PORT;

/**
    * Custom express configuration
    * The views part were commented since I'm still deciding whether or not it's worth to have a separated frontend.
        * For now it will remain commented. 
**/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(cors()); */
/*
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
*/

/* Routes */
import index from './routes/index';
import register from './routes/register';
import login from './routes/login';
import toDos from './routes/to-do';

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/to-dos', toDos);

app.listen(PORT, () => console.log('\x1b[35m%s\x1b[0m', `Server listening on http://localhost:${PORT}`));


/* TODO: Verify the sessionId on every single file. */
/* TODO: Verify every single parameter required by the route. */