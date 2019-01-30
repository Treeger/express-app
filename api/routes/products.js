import express from 'express';

const productsRouter = express.Router({mergeParams: true});

productsRouter.route('/')
    .get((req, res) => {
        res.send('products get request');
    });

productsRouter.route('/')
    .post((req, res) => {
        res.send('products post request');
    });

productsRouter.route('/:id')
    .get((req, res) => {
        res.send(`product id:${req.params.id} `);
    });

productsRouter.route('/:id/reviews')
    .get((req, res) => {
        res.send(`product review for id:${req.params.id} `);
    });

export default productsRouter