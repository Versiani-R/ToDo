export default interface IDatabaseToDoObject {
    sessionId: string;
    title: string;
    deadline: string;
    parent: string;
    isCompleted: boolean;
    isFavorite: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
        color: string;
    }
}