import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { clearSession, handleCorrectSession, hasSession } from 'utils/session';
import { doFetch } from 'utils/fetch';
import { redirect } from 'utils/url';

import 'styles/registration/global.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Don't allow the already logged user to access the login page. */
    useEffect(() => { hasSession() ? redirect('/to-dos/') : console.log('Not logged!') }, []);

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        /* Avoids page transition on submit. */
        event.preventDefault();

        const content = await doFetch({ url: 'login/', method: 'post', body: { email, password } });

        /* If the success is true and it returns the sessionId, adds the session and redirect to /to-dos/ */
        if (content.success && content.sessionId) handleCorrectSession(content.sessionId);

        /* If it fails to login, clear the session and reload the page. */
        if (!content.success) clearSession();
    }

    return (
        <div className='main-login'>
            <div className="align">
                <div className="grid align__item">
                    <div className="register">
                        <span className='fas fa-clipboard-check icon'></span>
                        <h2 className='registration-class'>Sign In</h2>

                        <form className="form">
                            <div className="form__field">
                                <input className='input' value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} type="email" placeholder="example@gmail.com" id='email' />
                            </div>

                            <div className="form__field">
                                <input className='input' value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} type="password" placeholder="••••••••••••" id='password' />
                            </div>

                            <div className="form__field">
                                <input className='input' onClick={(event: any) => { submitHandler(event) }} type="submit" value="Sign In" />
                            </div>
                        </form>

                        <p className='account-info-link'>Don't have an account ? <a href="/register/">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;