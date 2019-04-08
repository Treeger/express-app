import express from 'express';
import passport from 'passport'
import productsRouter from "./products";
import usersRouter from "./users";
import authRouter from "./auth"
import cityRouter from "./city"
import importerRouter from "./importer"

const router = express.Router();

const authRequired = passport.authenticate('jwt', {session: false});

router.use('/api/products',authRequired , productsRouter);
router.use('/api/users', usersRouter);
router.use('/auth', authRouter);
router.use('/api/cities', cityRouter);
router.use('/api/import', importerRouter);

export default router