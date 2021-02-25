export default interface IStyleProps {
    title: string;
    isCompleted: boolean;
    isFavorite: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
        color: string;
    }
}