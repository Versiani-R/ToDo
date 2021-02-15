interface IFetchParameters {
    url: string;
    method: string;
    body?: {
        sessionId?: string | null | undefined;
        email?: string;
        password?: string;
        title?: string;
        deadline?: string;
        newTitle?: string;
        newDeadline?: string;
    }
}

interface IFetchReturn {
    success: boolean;
    sessionId?: string;
    dues?: { title: string, deadline: string }[];
}

export type { IFetchParameters, IFetchReturn };