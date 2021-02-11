import { Router } from 'express';
import Database from '../utils/database';

/* Interfaces */
import IUser from '../interfaces/User';
import ICreateTodo from '../interfaces/CreateToDo';
import IUpdateTodo from '../interfaces/UpdateTodo';

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
    
    /* Note: << await >> is for .toArray, not to getToDosByEmail */
    res.send({ success: true, dues: await database.getToDosByEmail(user.email).toArray() });
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
        * A business rule is that the same user cannot add two to do's  with the same title.
        * The following check will make sure no to do will have the same title as another.
        * It also makes sure the title variable is available.
    **/
    if (await database.isToDoTitleAlreadyBeingUsed(title)) return res.send({ success: false });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(sessionId);
    await database.insertToDo({ email: user.email, title, deadline });

    res.send({ success: true });
});

router.put('/', async (req, res) => {
    const { sessionId, title, newTitle, newDeadline }: IUpdateTodo = req.body;

    /**
        * This check is very important for two reasons:
            1. If there is no sessionId, the user cannot be logged in.
            2. If there is no user with such sessionId, the user has an old sessionId.
        * In both scenarios the user must be logged out. 
    **/
    if (!sessionId || !await database.getUserBySessionId(sessionId)) return res.send({ success: false, sessionId });

    /**
        * A business rule is that the same user cannot add two to do's  with the same title.
        * The following check will make sure no to do will have the same title as another.
        * It also makes sure the title variable is available.
    **/
    if (!newTitle || await database.isToDoTitleAlreadyBeingUsed(newTitle)) return res.send({ success: false });

    if (!newDeadline || !title) return res.send({ success: false });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(sessionId);
    await database.updateToDo({ email: user.email, title, newTitle, newDeadline });
    
    res.send({ success: true });
});

router.delete('/', (req, res) => {

});

export default router;