export default interface ILoadProps {
    sessionId: string | boolean;
    title: string;
    isCompleted: boolean;
    isFavorite: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
        color: string;
    }
    children: any[];
    refresh: () => Promise<void>;
}