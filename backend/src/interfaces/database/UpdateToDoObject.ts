export default interface IUpdateToDoObject {
    sessionId: string;
    title: string;
    newTitle: string;

    isCompleted?: boolean;
    isFavorite?: boolean;
    styles?: {
        isBold: boolean;
        isItalic: boolean;
        color: string;
    }
}