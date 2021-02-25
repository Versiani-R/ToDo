export default interface IUpdateToDoStyles {
    email: string;
    title: string;
    isCompleted: boolean;
    isFavorite: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
        color: string;
    }
}