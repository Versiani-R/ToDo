export default interface IUpdateToDoObject {
    sessionId: string;
    title: string;
    newTitle: string;

    isCompleted?: boolean;
    styles?: {
        isBold: boolean;
        isItalic: boolean;
    }
}