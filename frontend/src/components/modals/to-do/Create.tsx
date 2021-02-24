import React, { useCallback, useEffect, useState } from 'react';

import 'styles/modal.css';

const CreateModal: React.FC = () => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    const displayModal = useCallback((shouldDisplay: boolean) => {
        const modal = document.getElementById('createToDoModal');
        if (!modal) return;

        if (shouldDisplay) modal.style.display = 'inline-block';
        else modal.style.display = 'none';
    }, []);

    useEffect(() => {
        const modal = document.getElementById('createToDoModal');
        const createToDoButton = document.getElementById('createToDoButton');

        /* Close the modal if the user clicked outside the box. */
        window.onclick = (event: any) => event.target === modal ? displayModal(false) : console.log();

        /* Cleaning after use. */
        createToDoButton?.addEventListener('click', () => {
            
            /**
                * Disables the button after it's clicked.
                
                Explanation If the user clicks really fast on the "Create To Do" button
                it would send multiple requests to the database.

                Problem   Frontend sending multiple unnecessary requests to the backend.
                Solution  Disabling the button, enabling it after the request was done.
            **/
            createToDoButton.setAttribute('disabled', 'true');

            setTimeout(() => {
                displayModal(false);

                /* Enable the button again after the request was done. */
                createToDoButton.removeAttribute('disabled');

                /* Cleaning */
                setTitle('');
                setDeadline('');
            }, 1000);
        })
    }, [displayModal]);

    return (
        <div>
            <div id="createToDoModal" className="modal">

                <div className="modal-content">
                    <span id="closeCreateToDoModal" className="close" onClick={() => displayModal(false)}>&times;</span>
                    
                    <label htmlFor="toDoTitle-create">Title: </label>
                    <input id="toDoTitle-create" value={title} onChange={(event: any) => setTitle(event.target.value)} type="text"/>

                    <label htmlFor="toDoDeadline-create">Deadline: </label>
                    <input id="toDoDeadline-create" value={deadline} onChange={(event: any) => setDeadline(event.target.value)} type="text"/>

                    <button id="createToDoButton">Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateModal;