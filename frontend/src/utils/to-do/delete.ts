import IOperations from 'interfaces/to-do/Operations';

import { doFetch } from "utils/fetch";

const _delete = async ({ sessionId, title, refresh }: IOperations) => {
    if (!title) return;

    // TODO: Display "Are you sure" message

    await doFetch({ url: 'to-dos/', method: 'delete', body: { sessionId, title } });
    await refresh();
}

export default _delete;