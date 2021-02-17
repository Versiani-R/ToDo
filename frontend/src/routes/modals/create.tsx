import React, { useCallback, useEffect, useState } from 'react';
import '../../static/css/modal.css';

const CreateToDo: React.FC = () => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleClose = useCallback(({ modal, isTarget }: { modal: HTMLElement | null, isTarget: boolean | null }) => {
        if (!modal) return;
        if (isTarget !== null && !isTarget) return;

        modal.style.display = 'none';
    }, []);

    useEffect(() => {
        const modal = document.getElementById('createToDoModal');
        const closeModal = document.getElementById('closeCreateToDoModal');
        
        closeModal?.addEventListener('click', () => { handleClose({ modal, isTarget: null }) });

        window.onclick = (event: any) => (modal && event.target === modal) ? modal.style.display = "none" : '';
    }, [handleClose]);

    return (
        <div>
            <div id="createToDoModal" className="modal">

                <div className="modal-content">
                    <span id="closeCreateToDoModal" className="close">&times;</span>
                    
                    <label htmlFor="toDoTitle-create">Title: </label>
                    <input id="toDoTitle-create" value={title} onChange={(event: any) => setTitle(event.target.value)} type="text"/>

                    <label htmlFor="toDoDeadline-create">Deadline: </label>
                    <input id="toDoDeadline-create" value={deadline} onChange={(event: any) => setDeadline(event.target.value)} type="text"/>

                    <button id="createToDoButton">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CreateToDo;