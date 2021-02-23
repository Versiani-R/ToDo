export default interface IOperations {
    sessionId: string | boolean;

    title?: string;
    parent?: string;
    isCompleted?: boolean;
    styles?: {
        isBold: boolean,
        isItalic: boolean
    }

    refresh: () => Promise<any>;
}