import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { clearSession, handleCorrectSession, hasSession } from 'utils/session';
import { doFetch } from 'utils/fetch';
import { redirect } from 'utils/url';

import 'styles/registration/global.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Don't allow the already registered / logged user to access the login page. */
    useEffect(() => { hasSession() ? redirect('/to-dos/') : console.log('Not registered!') }, []);

    const handlePasswordChange = () => {
        const numberOfCharacters = document.getElementById('10-characters');
        const numberOfNumbers = document.getElementById('2-numbers');
        const numberOfUpperCaseLetters = document.getElementById('2-upper-case-letters');

        if (!numberOfCharacters || !numberOfNumbers || !numberOfUpperCaseLetters) return;

        if (password.length >= 10) numberOfCharacters.style.color = '#8ceabb';
        else numberOfCharacters.style.color = '#7e8ba3';

        if (password.match(/(\d.*\d)/g)) numberOfNumbers.style.color = '#8ceabb';
        else numberOfNumbers.style.color = '#7e8ba3';

        if (password.match(/([A-Z].*[A-Z])/g)) numberOfUpperCaseLetters.style.color = '#8ceabb';
        else numberOfUpperCaseLetters.style.color = '#7e8ba3';
    }

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        /* Avoids page transition on submit. */
        event.preventDefault();

        const content = await doFetch({ url: 'register/', method: 'post', body: { email, password } });

        if (content.success && content.sessionId) handleCorrectSession(content.sessionId);

        if (!content.success) {
            clearSession();

            alert('Unable to Register');
        }
    }

    return (
        <div className='main-registration'>
            <div className="align">
                <div className="grid align__item">
                    <div className="register">
                        <span className='fas fa-clipboard-check icon'></span>
                        <h2 className='registration-class'>Sign Up</h2>

                        <form className="form">
                            <div className="form__field">
                                <input className='input' value={email} onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} type="email" placeholder="example@gmail.com" id='email' />
                            </div>

                            <div className="form__field">
                                <input className='input' value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} onKeyUp={handlePasswordChange} type="password" placeholder="••••••••••••" id='password' />
                            </div>

                            <div className="form__field">
                                <input className='input' onClick={(event: any) => { submitHandler(event) }} type="submit" value="Sign Up" />
                            </div>
                        </form>

                        <div className='info-register'>
                            <ul>
                                <li id='10-characters'>10 characters</li>
                                <li id='2-numbers'>2 numbers</li>
                                <li id='2-upper-case-letters'>2 upper-case letters</li>
                            </ul>
                        </div>

                        <p className='account-info-link'>Already have an account ? <a href="/login/">Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;