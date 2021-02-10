import { createHash } from 'crypto';

/**
    * To create a session id, the function will need:
        * User's email.
        * User's hashed password.
    
    * Note: The password will be hashed for obvious security reasons.
        * It's never a good idea to use plain-text passwords.
**/
export default function createSessionId(email: string, hashedPassword: string) {
    return createHash('md5').update(email + hashedPassword).digest('hex');
}