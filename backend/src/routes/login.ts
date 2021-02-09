import { Router } from 'express';
import passport from 'passport';

/**
    * Configuration.
    * It will initialize the router of the file.
**/
const router = Router();

// router.post('/', (req, res) => res.send('Hello'));
router.post('/', passport.authenticate('local', { successRedirect: 'sh', failureRedirect: '/login' }));
// router.post('/', passport.authenticate('local', { successRedirect: '/sh', failureRedirect: '/login' }));

export default router;