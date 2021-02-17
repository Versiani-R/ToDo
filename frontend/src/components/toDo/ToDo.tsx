import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

/* Modals */
import CreateToDo from 'components/modals/Create';

/* Utils */
import { doFetch } from 'utils/fetch';
import { handleWrongSession, hasSession } from 'utils/session';

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
 
    /* Create a To Do ( post ) */
    const handleCreate = async () => {

        /**
            * This code is called by the "Add ToDo".
            * The modal is the part that will be shown when the button is clicked.
            * The button itself is present on the modal, not being the one that called this function.
        **/
        const modal = document.getElementById('createToDoModal');
        const button = document.getElementById('createToDoButton');
        
        if (!modal || !button) return;

        // TODO: Create a controlModal() function, that takes the { display: boolean } parameter. False = hide, true = show.
        /* Displays the modal */
        modal.style.display = 'block';

        /* "Create To Do" button, not the "Add ToDo" button that called this function. */
        button.onclick = async () => {

            /**
                * Disables the button after it's clicked.
                
                Explanation: If the user clicks really fast on the "Create To Do" button
                it would send multiple requests to the database.

                Problem: Frontend sending multiple unnecessary requests to the backend.
                Solution: Disable the button, enabling it after the request was done.
            **/
            button.setAttribute('disabled', 'true');

            const title = document.getElementById('toDoTitle-create')?.getAttribute('value');
            const deadline = document.getElementById('toDoDeadline-create')?.getAttribute('value');

            // TODO: Display error message
            if (!title || !deadline) return;

            const content = await doFetch({ url: 'toDos/', method: 'post', body: { sessionId, title, deadline } });
            if (!content.success && content.sessionId) handleWrongSession();
            
            // TODO: Create a controlModal() function, that takes the { display: boolean } parameter. False = hide, true = show.
            /* Hide the modal */
            modal.style.display = 'none';
            
            await handleRetrieve();

            /* Enable the button again after the request was done. */
            button.removeAttribute('disabled');
        }
    }

    /* Update a To Do ( put ) */
    const handleUpdate = useCallback(async (event: any) => {

        /* Title of the element */
        const { innerText } = event.target;
        
        const modal = document.getElementById('createToDoModal');
        const button = document.getElementById('createToDoButton');
        
        if (!modal || !button) return;

        // TODO: Create a controlModal() function, that takes the { display: boolean } parameter. False = hide, true = show.
        /* Displays the modal */
        modal.style.display = 'block';

        /* "Create To Do" button, not the "Add ToDo" button that called this function. */
        button.onclick = async () => {

            /**
                * Disables the button after it's clicked.
                
                Explanation: If the user clicks really fast on the "Create To Do" button
                it would send multiple requests to the database.

                Problem: Frontend sending multiple unnecessary requests to the backend.
                Solution: Disable the button, enabling it after the request was done.
            **/
            button.setAttribute('disabled', 'true');

            const newTitle = document.getElementById('toDoTitle-create')?.getAttribute('value');
            const newDeadline = document.getElementById('toDoDeadline-create')?.getAttribute('value');

            // TODO: Display error message
            if (!newTitle || !newDeadline || !innerText) return;

            const content = await doFetch({ url: 'toDos/', method: 'put', body: { sessionId, title: innerText, newTitle, newDeadline } });
            
            if (!content.success && content.sessionId) handleWrongSession();
            
            // TODO: Create a controlModal() function, that takes the { display: boolean } parameter. False = hide, true = show.
            /* Hide the modal */
            modal.style.display = 'none';

            await handleRetrieve();

            /* Enable the button again after the request was done. */
            button.removeAttribute('disabled');
        }
    }, [sessionId, handleRetrieve]);

    /* Delete a To Do ( delete ) */
    const handleDelete = useCallback(async (event: any) => {

        const { innerText } = event.target;
        
        // TODO: Display error message
        if (!innerText) return;

        const content = await doFetch({ url: 'toDos/', method: 'delete', body: { sessionId, title: innerText } });

        if (!content.success && content.sessionId) handleWrongSession();
        await handleRetrieve();
    }, [sessionId, handleRetrieve]);

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
            h3.id = toDo.deadline;
            // TODO: Add the deadline
            
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
            <CreateToDo />

            <h1>To Do's</h1>

            <div id="content">
                <ul id="toDos-titles"></ul>

                <button id="add-toDos" onClick={handleCreate}>Add To Do</button>
            </div>
        </div>
    )
}

export default ToDos;