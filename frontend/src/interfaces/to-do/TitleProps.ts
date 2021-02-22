export default interface ILoadProps {
    sessionId: string | boolean;
    title: string;
    parent: string;
    children: any[];
    refresh: () => Promise<void>;
}