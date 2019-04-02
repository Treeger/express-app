import express from 'express';
import Product from "../models/mongoose/product";
const models = require('../models');

const productsRouter = express.Router({mergeParams: true});

productsRouter.route('/')
    .get((req, res) => {
        models.Product.findAll().then(products => {
            return res.send(products);
        }).catch(e => res.send('something went wrong'));
    });

productsRouter.route('/')
    .post((req, res) => {
        if (!req.body || !req.body.title || !req.body.description || !req.body.reviews) {
            return res.send("Please specify title and description and reviews");
        }
        models.Product.create({
            title: req.body.title,
            description: req.body.description,
            reviews: req.body.reviews
        }).then(product => {
            return res.send(product);
        }).catch(e => res.send('something went wrong'));

    });

productsRouter.route('/:id')
    .get((req, res) => {
        models.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(product => {
            return res.send(product);
        }).catch(e => res.send('something went wrong'));
    });

productsRouter.route('/:id/reviews')
    .get((req, res) => {
        models.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(product => {
            if (!product.reviews) return res.send('no reviews for this product');
            return res.send(product.reviews);
        }).catch(e => res.send('something went wrong'));
    });

productsRouter.route("/:id").delete((req, res) => {
    Product.deleteOne({_id: req.params.id}, (err, product) => {
        if (err) return res.send(err);
        return res.send(product);
    });
});

export default productsRouter