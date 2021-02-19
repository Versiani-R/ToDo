/* Interfaces */
import IDatabaseToDoObject from '../../interfaces/database/ToDoObject';

const organizeToDoObject = (object: IDatabaseToDoObject) => {
    /**
        * Returns an organized version of the object passed on the parameter.
        
        @param object
            object, holds to do's info.

        @returns The organized version of the object passed on the parameter.
    **/
    return {
        "sessionId": object.sessionId.trim(),
        "title": object.title.trim(),
        "deadline": object.deadline.trim(),
        "parent": object.parent.trim(),
        "isCompleted": object.isCompleted,
        "styles": {
            "isBold": object.styles.isBold,
            "isItalic": object.styles.isItalic
        }
    }
}

export { organizeToDoObject };