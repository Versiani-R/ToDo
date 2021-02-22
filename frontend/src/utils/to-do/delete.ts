/* Interfaces */
import IOperations from 'interfaces/to-do/Operations';

/* Utils */
import { doFetch } from "utils/fetch";
import { sessionCheck } from "utils/session";

const _delete = async ({ sessionId, title, refresh }: IOperations) => {

    console.log('delete');
    
    if (!title) return;

    const content = await doFetch({ url: 'to-dos/', method: 'delete', body: { sessionId, title } });
    sessionCheck(content);

    await refresh();
    console.log('deleted');

}

export default _delete;