export default interface ILoadProps {
    sessionId: string | null;
    titles: string[];
    deadlines: string[];
    refresh: () => Promise<void>;
}