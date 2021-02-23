export default interface ILoadProps {
    sessionId: string | boolean;
    title: string;
    parent: string;
    isCompleted: boolean;
    styles: {
        isBold: boolean;
        isItalic: boolean;
    }
    children: any[];
    refresh: () => Promise<void>;
}