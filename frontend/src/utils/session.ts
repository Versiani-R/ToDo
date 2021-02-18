/* Interfaces */
import { IFetchReturn } from 'interfaces/FetchParameters';

/* Utils */
import { redirect } from './url';

const addSession = (sessionId: string) => localStorage.setItem('sessionId', sessionId);
const clearSession = () => localStorage.clear();
const sessionCheck = (content: IFetchReturn) => { (!content.success && content.sessionId) ? handleWrongSession() : console.log()};
const hasSession = () => {
    const session = localStorage.getItem('sessionId');
    if (!session) handleWrongSession();
    
    return session;
}

const handleCorrectSession = (sessionId: string) => {
    addSession(sessionId);
    redirect('/to-dos/');
}

const handleWrongSession = () => {
    clearSession();
    redirect('/login/');
}

export { hasSession, clearSession, handleCorrectSession, handleWrongSession, sessionCheck };