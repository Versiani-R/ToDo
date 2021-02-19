import { Router } from 'express';

import IUser from '../interfaces/user/User';
import IDatabaseToDoObject from '../interfaces/database/ToDoObject';

import Database from '../utils/database/database';
import { sessionCheck, toDoObjectCheck } from '../utils/database/checks';

import { sanitizeStrings } from '../utils/sanitizer';

const router = Router();
const database = new Database();


router.get('/:sessionId', async (req, res) => {
    /* List all to do's being guided by the sessionId. */
    
    const { sessionId }: { sessionId?: string } = req.params;

    const check = await sessionCheck(sessionId);
    if (!check) return res.send({ success: false, sessionId });

    const { user }: { user: IUser } = check;

    /* Not async since it uses find instead of findOne */
    const toDos = database.getToDosByEmail(user.email);

    res.send({ success: true, dues: await toDos.toArray() });
});

router.post('/', async (req, res) => {
    /* Creates a new to do. */
    
    const { sessionId, title, deadline, parent, isCompleted, styles }: IDatabaseToDoObject = req.body;

    const check = await sessionCheck(sessionId);
    if (!check) return res.send({ success: false, sessionId });

    const objectCheck = await toDoObjectCheck({ sessionId, title, deadline, parent, isCompleted, styles });
    if (!objectCheck) return res.send({ success: false, sessionId });

    await database.insertToDo(objectCheck);

    res.send({ success: true });
});

router.put('/', async (req, res) => {
    /* Updates an existing to do. */

    const { sessionId, title, deadline, parent, isCompleted, styles }: IDatabaseToDoObject = req.body;
    
    const check = await sessionCheck(sessionId);
    if (!check) return res.send({ success: false, sessionId });

    const objectCheck = await toDoObjectCheck({ sessionId, title, deadline, parent, isCompleted, styles });
    if (!objectCheck) return res.send({ success: false, sessionId });

    await database.updateToDoByTitle(objectCheck);

    res.send({ success: true });
});

router.delete('/', async (req, res) => {
    /* Removes an existing to do. */

    const { sessionId, title }: { sessionId: string, title: string } = req.body;

    const check = await sessionCheck(sessionId);
    if (!check) return res.send({ success: false, sessionId });

    if (!title || typeof(title) !== 'string') return res.send({ success: false });

    const { user }: { user: IUser } = check;

    await database.removeToDoByTitle({ email: user.email, title: title.trim() });

    return res.send({ success: true });
});

export default router;