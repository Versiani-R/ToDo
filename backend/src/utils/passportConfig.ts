import { compare } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { config } from 'dotenv';
import passport from 'passport';
import Database from './database';

/**
    * Configuration
    * It will initiate the environment variables.
    * It will initialize the database and it's methods.
**/
config();
const database = new Database();

/**
    * Initialize will be responsible for starting the whole session logic.
    * The idea behind this function is to call it as soon as possible.
    * When initialized, the whole login + session logic will be working.
**/
function initialize() {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        /**
            * isEmailAlreadyRegistered will try to find an email with the parameter passed.
            * In case it succeeds, it returns the object found.
            * In case it doesn't, it returns null.
        **/
        const user = await database.isEmailAlreadyRegistered(email);

        if (!user) return done(null, false, { message: 'No user with that email' });

        /**
            * It will try to match the hashed passwords.
            * Both passwords are hashed.
            * In case of a match it will mark the user as authenticated and store a session.
            * In case there is no match it returns an error.
        **/
        if (await compare(password, user.password)) return done(null, user);
        
        return done(null, false, { message: 'Incorrect password' });
    }));
    passport.serializeUser((user, done) => done(null, user)); /* It might be a problem. */
    passport.deserializeUser(async (id: string, done) => done(null, await database.isEmailAlreadyRegistered(id)));
}

export default initialize;