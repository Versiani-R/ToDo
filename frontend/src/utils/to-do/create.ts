/* Interfaces */
import IOperations from 'interfaces/to-do/Operations';

/* Utils */
import { doFetch } from "utils/fetch";
import { getElementsById, getElementsValueById } from "utils/getElements";
import { displayModal } from "utils/modals";
import { sessionCheck } from "utils/session";

const handleCreate = async ({ sessionId, refresh }: IOperations) => {
    const [ modal, button ] = getElementsById(['createToDoModal', 'createToDoButton']);

    displayModal({ modal, display: true });

    button.onclick = async () => {
        const [ title, deadline ] = getElementsValueById(['toDoTitle-create', 'toDoDeadline-create']);

        if (!title || !deadline) return;

        const content = await doFetch({ url: 'to-dos/', method: 'post', body: { sessionId, title, deadline } });
        sessionCheck(content);

        await refresh();
    }
}

export default handleCreate;