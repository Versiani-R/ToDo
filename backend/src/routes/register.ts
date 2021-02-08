import { Router } from 'express';
import Database from '../utils/database';

/**
    * Configuration.
    * It will initialize the router of the file.
    * It will initialize the database and it's methods.
**/
const router = Router();
const database = new Database();


router.get('/', (req, res) => {
    return res.send('Register');
});

export default router;