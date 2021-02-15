import redirect from './redirect';

const addSession = (sessionId: string) => localStorage.setItem('sessionId', sessionId);
const hasSession = () => localStorage.getItem('sessionId');
const clearSession = () => localStorage.clear();

const handleRightSession = (sessionId: string) => {
    addSession(sessionId);
    redirect('/toDos/');
}

export { addSession, hasSession, clearSession, handleRightSession };