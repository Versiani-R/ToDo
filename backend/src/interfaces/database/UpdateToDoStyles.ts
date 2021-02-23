export default interface IUpdateToDoStyles {
    email: string;
    title: string;
    isCompleted: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
    }
}