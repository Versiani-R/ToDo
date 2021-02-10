import { Router } from 'express';
import Database from '../utils/database';

/* Interfaces */
import IUser from '../interfaces/User';

/**
    * Configuration
    * It will initialize the router of the file.
    * It will initialize the database and all it's methods.
**/
const router = Router();
const database = new Database();


router.post('/get', async (req, res) => {
    const { sessionId }: { sessionId: string } = req.body;

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

export default router;