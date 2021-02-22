import React, { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import LoadToDo from 'components/to-do/Load';

import CreateModal from 'components/modals/Create';

import { doFetch } from 'utils/fetch';
import { handleWrongSession, hasSession, sessionCheck } from 'utils/session';
import create from 'utils/to-do/create';

const ToDos: React.FC = () => {
    const [toDos, setToDos] = useState([{
        email: '',
        title: '',
        deadline: '',
        parent: '',
        isCompleted: false,
        styles: {
            isBold: false,
            isItalic: false,
        }
    }]);

    /**
        * It will be checked on the backend.
        * If the sessionId is wrong / old, the user will be logged out.
    **/
    const sessionId = hasSession();

    /* Retrieve To Do's ( get ) */
    const handleRetrieve = useCallback(async () => {
        const content = await doFetch({ url: 'to-dos/' + sessionId, method: 'get' });
        sessionCheck(content);

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
        console.log(toDos);
        
    }, [sessionId, toDos]);

    useEffect(() => {
        if (!sessionId) handleWrongSession();
        handleRetrieve();
    }, [sessionId, handleRetrieve]);

    return (
        <div>
            <CreateModal />
            <LoadToDo
                sessionId={sessionId}
                toDos={toDos}
                refresh={handleRetrieve}
            />

            <button id="add-toDos" onClick={async () => await create({ sessionId, refresh: handleRetrieve, parent: '' })}>Add To Do</button>
        </div>
    )
}

export default ToDos;