import React, { useCallback, useEffect, useState } from 'react';

import 'styles/to-dos/modal.css';

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

    const handleKeyDownAndButton = (event: any) => {
        const { id } = event.target;
        const title: any = document.getElementById('toDoDeadline-create');
        
        if (id.includes('Title')) if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault();
            title?.select();
        }
        if (id.includes('Deadline')) if (event.key === 'Enter') document.getElementById('createToDoButton')?.click();
    }

    return (
        <div>
            <div id="createToDoModal" className="modal">

                <div className="modal-content">
                    <span id="closeCreateToDoModal" className="close" onClick={() => displayModal(false)}>&times;</span>

                    <div className="webflow-style-input">
                        <input autoComplete='off' id='toDoTitle-create' value={title} onKeyDown={handleKeyDownAndButton} onChange={(event: any) => setTitle(event.target.value)} type="text" placeholder="Title"></input>
                    </div>

                    <div className="webflow-style-input">
                        <input autoComplete='off' id='toDoDeadline-create' value={deadline} onKeyDown={handleKeyDownAndButton} onChange={(event: any) => setDeadline(event.target.value)} type="text" placeholder="Deadline"></input>
                    </div>

                    <div className='buttons'>
                        <button className='create-to-do' id="createToDoButton">
                            <i className='fas fa-check'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateModal;