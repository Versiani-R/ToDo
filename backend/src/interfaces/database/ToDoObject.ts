export default interface IDatabaseToDoObject {
    sessionId: string;
    title: string;
    deadline: string;
    parent: string;
    isCompleted: boolean;
    styles: {
        isBold: boolean,
        isItalic: boolean
    }
}