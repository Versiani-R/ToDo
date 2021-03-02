import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";

const _delete = async ({ sessionId, title, refresh }: IOperations) => {
    const modal = document.getElementById('delete-modal');
    const deleteButton = document.getElementById('delete-modal-accept');

    if (!title || !modal || !deleteButton) return;

    modal.style.display = 'block';

    deleteButton.onclick = async () => {
        await doFetch({ url: 'to-dos/', method: 'delete', body: { sessionId, title } });
        modal.style.display = 'none';
        await refresh();
    }
}

export default _delete;