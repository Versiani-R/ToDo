const addSession = (sessionId: string) => localStorage.setItem('sessionId', sessionId);
const hasSession = () => localStorage.getItem('sessionId');
const clearSession = () => localStorage.clear();

export { addSession, hasSession, clearSession };