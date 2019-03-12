import express from 'express';
import passport from 'passport'
import productsRouter from "./products";
import usersRouter from "./users";
import authRouter from "./auth"

const router = express.Router();

const authRequired = passport.authenticate('jwt', {session: false});

router.use('/api/products',authRequired , productsRouter);
router.use('/api/users', usersRouter);
router.use('/auth', authRouter);


export default router