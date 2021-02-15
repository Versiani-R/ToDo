import { IFetchParameters, IFetchReturn } from '../interfaces/FetchParameters';

const doFetch = async({ url, method, body }: IFetchParameters): Promise<IFetchReturn> => {
    const rawResponse = await fetch('http://locaalhost:8000/' + url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return (await rawResponse.json());
}

export { doFetch };