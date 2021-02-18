/* Interfaces */
import IOperations from 'interfaces/to-do/Operations';

/* Utils */
import { doFetch } from "utils/fetch";
import { getElementsById, getElementsValueById } from "utils/getElements";
import { displayModal } from "utils/modals";
import { sessionCheck } from "utils/session";

const update = async ({ event, sessionId, refresh }: IOperations) => {

    /* Title of the element */
    const { innerText } = event.target;

    const [ modal, button ] = getElementsById(['createToDoModal', 'createToDoButton']);        

    displayModal({ modal, display: true });

    button.onclick = async () => {

        const [ newTitle, newDeadline ] = getElementsValueById(['toDoTitle-create', 'toDoDeadline-create']);

        if (!newTitle || !newDeadline || !innerText) return;

        const content = await doFetch({ url: 'to-dos/', method: 'put', body: { sessionId, title: innerText, newTitle, newDeadline } });
        sessionCheck(content);            

        await refresh();
    }
}
export default update;