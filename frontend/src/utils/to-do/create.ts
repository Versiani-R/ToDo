import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";
import { getElementsById, getElementsValueById } from "utils/getElements";

const handleCreate = async ({ sessionId, refresh, parent }: IOperations) => {
    const [ modal, button ] = getElementsById(['createToDoModal', 'createToDoButton']);

    modal.style.display = 'inline-block';

    button.onclick = async () => {
        const [ title, deadline ] = getElementsValueById(['toDoTitle-create', 'toDoDeadline-create']);

        if (!title || !deadline) return;

        await doFetch({ url: 'to-dos/', method: 'post', body: {
            sessionId,
            title,
            deadline,
            parent,
            isCompleted: false,
            isFavorite: false,
            styles: {
                isBold: false,
                isItalic: false,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            }
        } });

        await refresh();
    }
}

export default handleCreate;