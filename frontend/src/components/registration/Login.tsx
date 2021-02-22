import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

/* Utils */
import { clearSession, handleCorrectSession, hasSession } from 'utils/session';
import { doFetch } from 'utils/fetch';
import { redirect } from 'utils/url';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => { hasSession() ? redirect('/to-dos/') : console.log('Not logged!') }, []);

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        /* Avoids page transition on submit. */
        event.preventDefault();

        const content = await doFetch({ url: 'login/', method: 'post', body: { email, password } });

        /* If the success is true and it returns the sessionId, adds the session and redirect to /to-dos/ */
        if (content.success && content.sessionId) handleCorrectSession(content.sessionId);

        /* If it fails to login, clear the session and display error message. */
        if (!content.success) {
            clearSession();

            // TODO: Display error message.
            alert('Could not login! Try again!')
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
            
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>

            <button type="submit" onClick={submitHandler}>Submit</button>
        </div>
    )
}

export default Login;