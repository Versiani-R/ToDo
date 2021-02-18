export default interface IOperations {
    sessionId: string | null;
    event: any;
    refresh: () => Promise<any>;
}