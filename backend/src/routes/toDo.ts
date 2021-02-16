import { Router } from 'express';
import Database from '../utils/database';

/* Interfaces */
import IUser from '../interfaces/User';
import ICreateToDo from '../interfaces/CreateToDo';
import IUpdateToDo from '../interfaces/UpdateToDo';
import IDeleteToDo from '../interfaces/DeleteToDo';

import { sanitize } from '../utils/sanitizer';
import { typeComparison } from '../utils/typeComparison';

/**
    * Configuration
    * It will initialize the router of the file.
    * It will initialize the database and all it's methods.
**/
const router = Router();
const database = new Database();


/* List all to do's being guided by the sessionId, passed on the parameter. */
router.get('/:sessionId', async (req, res) => {
    const { sessionId }: { sessionId?: string } = req.params;

    /* Basic sanitization */
    const _sessionId = sanitize(sessionId);

    /**
        * This check is very important for two reasons:
            1. If the sanitized elements are okay to use.
            2. If there is no sessionId, the user cannot be logged in.
            3. If there is no user with such sessionId, the user has an old sessionId.
        * In scenarios 2 and 3, the user must be logged out. 
    **/
    if (typeof(_sessionId) !== 'string') return res.send({ success: false });
    if (!sessionId || !await database.getUserBySessionId(_sessionId)) return res.send({ success: false, sessionId });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(_sessionId);
    
    /* Note: << await >> is for .toArray, not to getToDosByEmail */
    res.send({ success: true, dues: await database.getToDosByEmail(user.email).toArray() });
});

/* Creates a new to do. */
router.post('/', async (req, res) => {
    const { sessionId, title, deadline }: ICreateToDo = req.body;

    /* Basic sanitization */
    const [ _sessionId, _title, _deadline ] = sanitize([sessionId, title, deadline]);

    /**
        * This check is very important for two reasons:
            1. If the sanitized elements are okay to use.
            2. If there is no sessionId, the user cannot be logged in.
            3. If there is no user with such sessionId, the user has an old sessionId.
        * In scenarios 2 and 3, the user must be logged out. 
    **/
    if (!typeComparison([_sessionId, _title, _deadline], 'string') || !title || !deadline) return res.send({ success: false });
    if (!sessionId || !await database.getUserBySessionId(_sessionId)) return res.send({ success: false, sessionId });

    /**
        * A business rule is that the same user cannot add two to do's  with the same title.
        * The following check will make sure no to do will have the same title as another.
        * It also makes sure the title variable is available.
    **/
    if (await database.isToDoTitleAlreadyBeingUsed(_title)) return res.send({ success: false });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(_sessionId);
    await database.insertToDo({ email: user.email, title: _title, deadline: _deadline });

    res.send({ success: true });
});

/* Updates an existing to do. */
router.put('/', async (req, res) => {
    const { sessionId, title, newTitle, newDeadline }: IUpdateToDo = req.body;

    /* Basic sanitization */
    const [ _sessionId, _title, _newTitle, _newDeadline ] = sanitize([sessionId, title, newTitle, newDeadline]);

    /**
        * This check is very important for two reasons:
            1. If the sanitized elements are okay to use.
            2. If there is no sessionId, the user cannot be logged in.
            3. If there is no user with such sessionId, the user has an old sessionId.
        * In scenarios 2 and 3, the user must be logged out. 
    **/
    if (!typeComparison([_sessionId, _title, _newTitle, _newDeadline], 'string') || !title || !newTitle || !newDeadline) return res.send({ success: false });
    if (!sessionId || !await database.getUserBySessionId(_sessionId)) return res.send({ success: false, sessionId });

    /**
        * A business rule is that the same user cannot add two to do's  with the same title.
        * The following check will make sure no to do will have the same title as another.
        * It also makes sure the title variable is available.
    **/
    if (await database.isToDoTitleAlreadyBeingUsed(_newTitle)) return res.send({ success: false });

    /**
        * It will use the sessionId to identify the owner of the todo.
        * The getUserBySessionId() returns the user object ( or null ).
        * Once the user is passed through the checks, it will return all toDos.
        * The toDos will then be iterated on the frontend.
    **/
    const user: IUser = await database.getUserBySessionId(_sessionId);
    await database.updateToDoByTitle({ email: user.email, title: _title, newTitle: _newTitle, newDeadline: _newDeadline });
    
    res.send({ success: true });
});

/* Removes an existing to do. */
router.delete('/', async (req, res) => {
    const { sessionId, title }: IDeleteToDo = req.body;

    /* Basic sanitization */
    const [ _sessionId, _title ] = sanitize([sessionId, title]);

    /**
        * This check is very important for two reasons:
            1. If the sanitized elements are okay to use.
            2. If there is no sessionId, the user cannot be logged in.
            3. If there is no user with such sessionId, the user has an old sessionId.
        * In scenarios 2 and 3, the user must be logged out. 
    **/
   if (!typeComparison([_sessionId, _title], 'string') || !title) return res.send({ success: false });
   if (!sessionId || !await database.getUserBySessionId(_sessionId)) return res.send({ success: false, sessionId });

    /**
        * It will use the to do title to remove it.
        * The business rule "A to do cannot have the same title as another" comes
            * in hand in both update and delete methods, since otherwise, the only way
            * to identify to do's would be by it's id.
    **/
    const user: IUser = await database.getUserBySessionId(_sessionId);
    await database.removeToDoByTitle({ email: user.email, title: _title });

    return res.send({ success: true });
});

export default router;