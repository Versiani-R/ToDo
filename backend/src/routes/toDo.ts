import { Router } from 'express';
import Database from '../utils/database';

/* Interfaces */
import IUser from '../interfaces/User';
import ICreateTodo from '../interfaces/CreateToDo';

/**
    * Configuration
    * It will initialize the router of the file.
    * It will initialize the database and all it's methods.
**/
const router = Router();
const database = new Database();


router.get('/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    /**
        * This check is very important for two reasons:
            1. If there is no sessionId, the user cannot be logged in.
            2. If there is no user with such sessionId, the user has an old sessionId.
        * In both scenarios the user must be logged out. 
    **/
    if (!sessionId || !await database.getUserBySessionId(sessionId)) return res.send({ success: false, sessionId });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(sessionId);
    
    /* Note: << await >> is for .toArray, not to getDuesByEmail */
    res.send({ success: true, dues: await database.getDuesByEmail(user.email).toArray() });
});

router.post('/', async (req, res) => {
    const { sessionId, title, deadline }: ICreateTodo = req.body;

    /**
        * This check is very important for two reasons:
            1. If there is no sessionId, the user cannot be logged in.
            2. If there is no user with such sessionId, the user has an old sessionId.
        * In both scenarios the user must be logged out. 
    **/
    if (!sessionId || !await database.getUserBySessionId(sessionId)) return res.send({ success: false, sessionId });
    if (!title || !deadline) return res.send({ success: 'false' });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(sessionId);
    await database.insertToDo({ email: user.email, title, deadline });
    
    /* Note: << await >> is for .toArray, not to getDuesByEmail */
    res.send({ success: true });
});

router.put('/', (req, res) => {
    
});

router.delete('/', (req, res) => {

});

export default router;