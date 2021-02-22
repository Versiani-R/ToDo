import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { clearSession, handleCorrectSession, hasSession } from 'utils/session';
import { doFetch } from 'utils/fetch';
import { redirect } from 'utils/url';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => { hasSession() ? redirect('/to-dos/') : console.log('Not registered!') }, []);

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        /* Avoids page transition on submit. */
        event.preventDefault();

        const content = await doFetch({ url: 'register/', method: 'post', body: { email, password } });

        if (content.success && content.sessionId) handleCorrectSession(content.sessionId);

        if (!content.success) {
            clearSession();

            // TODO: Display error message.
            alert('Unable to Register');
        }
    }

    return (
        <div>
            <h1>Register</h1>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
            
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>

            <button type="submit" onClick={submitHandler}>Submit</button>
        </div>
    )
}

export default Register;