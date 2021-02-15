import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

import { IFetchReturn } from '../interfaces/FetchParameters';

import { doFetch } from '../utils/fetch';
import { handleWrongSession, hasSession } from '../utils/session';

const ToDos: React.FC = () => {
    const [toDos, setToDos] = useState([{ title: '', deadline: '' }]);
    const sessionId = hasSession();

    /* Retrieve and load all To Do's ( get ) */
    const handleRetrieve = useCallback(async () => {
        const content = await doFetch({ url: `toDos/${sessionId}`, method: 'get' });
        console.log(content);

        if (!content.success && content.sessionId) handleWrongSession();

        /**
            * Check if the content.dues is the same as the toDos.
            
            Explanation: If they're the same, it means the setToDos was already called.
                * This is important since without the object check with lodash, the setToDos
                would be called infinitely.
                
                Problem: The useEffect and all the other dependents would also be called forever.
                    Solution: Adding this object comparison, when on the first iteration calls the
                    setToDos, and then, on the second call, finishes the execution.
        **/
        if (content.dues && !(_.isEqual(content.dues, toDos))) setToDos(content.dues);
    }, [sessionId, toDos]);

    /**
        * @param content:
            * Will be the returned value of the function "doFetch", and for so, it will be the same
            as the interface "IFetchParameters".
        
        Explanation: It will check the value returned and handle it. Calling the retrieve if all fine.

    **/
    const handleSessionAndRetrieve = useCallback(async ({ content }: { content: IFetchReturn }) => {
        if (!content.success && content.sessionId) handleWrongSession();

        await handleRetrieve();
    }, [handleRetrieve]);

    /* Create a To Do ( post ) */
    const handleCreate = async () => {
        const content = await doFetch({ url: 'toDos/', method: 'post', body: { sessionId, title: 'Title', deadline: 'Tomorrow' } });
        handleSessionAndRetrieve({ content });
    }

    /* Update a To Do ( put ) */
    const handleUpdate = useCallback(async () => {
        const content = await doFetch({ url: 'toDos/', method: 'put', body: { sessionId, title: 'Title', newTitle: 'Title. Updated.', newDeadline: 'Yesterday' } });
        handleSessionAndRetrieve({ content });
    }, [sessionId, handleSessionAndRetrieve]);

    /* Delete a To Do ( delete ) */
    const handleDelete = useCallback(async () => {
        const content = await doFetch({ url: 'toDos/', method: 'delete', body: { sessionId, title: 'Title. Updated.' } });
        handleSessionAndRetrieve({ content });
    }, [sessionId, handleSessionAndRetrieve]);

    const loadToDos = useCallback(() => {
        const ul = document.getElementById('toDos-titles');
        if (!ul) return;

        /* Cleaning the list. */
        ul.innerHTML = '';

        for (const toDo of toDos) {

            const li = document.createElement('li');

            const h3 = document.createElement('h3');
            h3.classList.add('toDos-title');
            h3.innerText = `${toDo.title}`;
            // TODO: Add the deadline
            h3.id = toDo.title;
            
            h3.ondblclick = handleUpdate;
            h3.onauxclick = handleDelete;

            li.appendChild(h3);
            ul.appendChild(li);
        }
    }, [toDos, handleUpdate, handleDelete]);

    /* Load the To Do's when the page loads or when the toDos change. */
    useEffect(() => {
        if (!sessionId) handleWrongSession();

        handleRetrieve();
        loadToDos();
    }, [sessionId, loadToDos, handleRetrieve]);

    return (
        <div>
            <h1>To Do's</h1>

            <div id="content">
                <ul id="toDos-titles"></ul>

                <button id="add-toDos" onClick={handleCreate}>Add To Do</button>
            </div>
        </div>
    )
}

export default ToDos;