export default interface IOperations {
    sessionId: string | boolean;
    event?: any;
    refresh: () => Promise<any>;

    title?: string;
    parent?: string;
    isCompleted?: boolean;
    styles?: {
        isBold: boolean,
        isItalic: boolean
    }
}