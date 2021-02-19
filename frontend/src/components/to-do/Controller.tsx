import React, { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

/* Components */
import LoadToDo from './Load';

/* Modals */
import CreateModal from 'components/modals/Create';

/* Utils */
import { doFetch } from 'utils/fetch';
import { hasSession, sessionCheck } from 'utils/session';
import create from 'utils/to-do/create';

const ToDos: React.FC = () => {
    const [toDos, setToDos] = useState([{ title: '', deadline: '' }]);

    /**
        * The session id is publicly displayed on the top part of the file.
        * But it will also be checked on the backend.
        * If the sessionId is wrong / old, the user will be logged out.
    **/
    const sessionId = hasSession();

    /* Retrieve and load all To Do's ( get ) */
    const handleRetrieve = useCallback(async () => {
        console.log('called');
        const content = await doFetch({ url: 'to-dos/' + sessionId, method: 'get' });

        /**
            * Check if the content.dues is the same as the to Dos.

            Explanation If they're the same, it means the setToDos was already called.
                * This is important since without the object check with lodash, the setToDos
                would be called infinitely.

                Problem  The useEffect and all the other dependents would also be called forever.
                Solution Adding this object comparison, calling setToDos on the first iteration
                and finishing the execution on the second call.
        **/
        if (content.dues && !isEqual(content.dues, toDos)) setToDos(content.dues);
        sessionCheck(content);
    }, [sessionId, toDos]);

    useEffect(() => { handleRetrieve() }, [handleRetrieve]);

    return (
        <div>
            <CreateModal />
            <LoadToDo
                sessionId={sessionId}
                titles={toDos.map(element => element.title)}
                deadlines={toDos.map(element => element.deadline)}
                refresh={handleRetrieve}
            />

            <button id="add-toDos" onClick={async () => await create({ event: null, sessionId, refresh: handleRetrieve })}>Add To Do</button>
        </div>
    )
}

export default ToDos;