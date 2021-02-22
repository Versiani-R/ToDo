export default interface ILoadProps {
    sessionId: string | boolean;
    toDos: {
        email: string;
        title: string;
        deadline: string;
        parent: string;
        isCompleted: boolean;
        styles: {
            isBold: boolean,
            isItalic: boolean;
        }
    }[];
    refresh: () => Promise<void>;
}