export default interface ILoadProps {
    sessionId: string | boolean;
    title: string;
    isCompleted: boolean;
    isFavorite: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
    }
    children: any[];
    refresh: () => Promise<void>;
}