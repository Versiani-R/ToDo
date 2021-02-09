import express from 'express';
import { config } from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import methodOverride from 'method-override';
import initialize from './utils/passportConfig';

/* import path from 'path'; */


/**
    * Configurations
    * It will initiate the app ( express )
    * Call the config function for the dotenv file ( .env )
    * Create the port variable
**/
initialize();
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
/*
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
*/
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


/* Routes */
import index from './routes/index';
import login from './routes/login';
import register from './routes/register';

app.use('/', index);
app.use('/login', login);
app.use('/register', register);

app.listen(PORT, () => console.log('\x1b[35m%s\x1b[0m', `Server listening on http://localhost:${PORT}`));