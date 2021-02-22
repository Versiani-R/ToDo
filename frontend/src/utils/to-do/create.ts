/* Interfaces */
import IOperations from 'interfaces/to-do/Operations';

/* Utils */
import { doFetch } from "utils/fetch";
import { getElementsById, getElementsValueById } from "utils/getElements";
import { sessionCheck } from "utils/session";

const handleCreate = async ({ sessionId, refresh, parent }: IOperations) => {
    const [ modal, button ] = getElementsById(['createToDoModal', 'createToDoButton']);

    modal.style.display = 'inline-block';

    button.onclick = async () => {
        const [ title, deadline ] = getElementsValueById(['toDoTitle-create', 'toDoDeadline-create']);

        if (!title || !deadline) return;

        console.log(parent);

        const content = await doFetch({ url: 'to-dos/', method: 'post', body: {
            sessionId,
            title,
            deadline,
            parent,
            isCompleted: false,
            styles: {
                isBold: false,
                isItalic: false,
            }
        } });
        sessionCheck(content);

        await refresh();
    }
}

export default handleCreate;