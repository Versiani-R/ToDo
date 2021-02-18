import { redirect } from './url';

const addSession = (sessionId: string) => localStorage.setItem('sessionId', sessionId);
const hasSession = () => localStorage.getItem('sessionId');
const clearSession = () => localStorage.clear();

const handleCorrectSession = (sessionId: string) => {
    addSession(sessionId);
    redirect('/to-dos/');
}

const handleWrongSession = () => {
    clearSession();
    redirect('/login/');
}

export { hasSession, clearSession, handleCorrectSession, handleWrongSession };