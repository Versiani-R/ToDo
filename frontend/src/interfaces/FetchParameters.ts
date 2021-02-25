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
        isFavorite?: boolean;
        styles?: {
            isBold: boolean;
            isItalic: boolean;
            color: string;
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
        isFavorite: boolean;
        styles: {
            isBold: boolean;
            isItalic: boolean;
            color: string;
        }
    }[];
}

export type { IFetchParameters, IFetchReturn };