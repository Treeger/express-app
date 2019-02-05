import express from 'express';
import productsRouter from "./products";
import usersRouter from "./users";

const router = express.Router();

router.use('/api/products', productsRouter);
router.use('/api/users', usersRouter);


export default router