import { IFetchReturn } from 'interfaces/FetchParameters';

import { redirect } from 'utils/url';

const addSession = (sessionId: string) => localStorage.setItem('sessionId', sessionId);
const clearSession = () => localStorage.clear();

const sessionCheck = (content: IFetchReturn) => {
    if (!hasSession()) handleWrongSession();

    if (!content.success && content.sessionId) handleWrongSession();
}

const hasSession = () => {
    const session = localStorage.getItem('sessionId');
    if (!session) return false;
    
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