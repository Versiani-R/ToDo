import { IFetchParameters, IFetchReturn } from 'interfaces/FetchParameters';

import { sessionCheck } from 'utils/session';

const doFetch = async({ url, method, body }: IFetchParameters): Promise<IFetchReturn> => {
    const rawResponse = await fetch('http://localhost:8000/' + url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    const content = await rawResponse.json();
    sessionCheck(content);

    return content;
}

export { doFetch };