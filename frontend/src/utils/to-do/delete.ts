/* Interfaces */
import IOperations from 'interfaces/to-do/Operations';

/* Utils */
import { doFetch } from "utils/fetch";
import { sessionCheck } from "utils/session";

const _delete = async ({ event, sessionId, refresh }: IOperations) => {

    /* Title of the element */
    const { innerText } = event.target;

    if (!innerText) return;

    const content = await doFetch({ url: 'to-dos/', method: 'delete', body: { sessionId, title: innerText } });
    sessionCheck(content);

    await refresh();
}

export default _delete;