interface IFetchParameters {
    url: string;
    method: string;
    body?: {
        sessionId?: string | null | undefined | boolean;
        email?: string;
        password?: string;
        title?: string;
        deadline?: string;
        newTitle?: string;
        newDeadline?: string;
        parent?: string;
        isCompleted?: boolean;
        styles?: {
            isBold: boolean,
            isItalic: boolean
        }
    }
}

interface IFetchReturn {
    success: boolean;
    sessionId?: string;
    dues?: {
        email: string;
        title: string;
        deadline: string;
        newTitle?: string;
        newDeadline?: string;
        parent: string;
        isCompleted: boolean;
        styles: {
            isBold: boolean,
            isItalic: boolean
        }
    }[];
}

export type { IFetchParameters, IFetchReturn };