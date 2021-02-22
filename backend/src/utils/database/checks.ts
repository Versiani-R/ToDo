import IDatabaseToDoObject from "../../interfaces/database/ToDoObject";

import Database from './database';
import { organizeToDoObject } from "./objects";

/* It will initialize the database and all it's methods. */
const database = new Database();

const toDoObjectCheck = async (object: IDatabaseToDoObject) => {
    /**
        * Checks all possibly-wrong scenarios with the object. Such as:
            * Elements not being present.
            * Elements with wrong types.
            * Elements not following business rules.
        @param object
            object, holds to do's info.
        
        @returns The organized version of the object passed on the parameter.
    **/

    const { title, deadline, parent, isCompleted, styles }: IDatabaseToDoObject = object;

    if (!title || typeof(title) !== 'string' || await database.isToDoTitleAlreadyBeingUsed(title)) return false;

    if (!deadline || typeof(deadline) !== 'string') return false;

    // TODO:
    /* The parent can be empty */
    if (typeof(parent) !== 'string') return false;

    if (isCompleted === null || typeof(isCompleted) !== 'boolean') return false;

    if (!styles) return false;
    const { isBold, isItalic } = styles;
    if (isBold === null || typeof(isBold) !== 'boolean') return false;
    if (isItalic === null || typeof(isItalic) !== 'boolean') return false;

    return organizeToDoObject(object);
}

const sessionCheck = async (sessionId: any) => {
    /**
        * Checks all possibly-wrong scenarios with the sessionId. Such as:
            * Not present.
            * Wrong type.
            * Old / wrong.
        @param sessionId
            string, unique to each user.

        @returns The user with such sessionId.
    **/
    if (!sessionId || typeof(sessionId) !== 'string') return false;

    if (!await database.getUserBySessionId(sessionId)) return false;

    const _sessionId = sessionId.trim();
    return {
        "user": await database.getUserBySessionId(_sessionId)
    }
}

export { toDoObjectCheck, sessionCheck };