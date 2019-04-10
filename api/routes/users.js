import express from 'express';
const models = require('../models');
import User from "../models/mongoose/user";
const usersRouter = express.Router({mergeParams: true});

usersRouter.route('/')
    .get((req, res) => {
        models.User.findAll().then(user => {
            return res.send(user);
        }).catch(e => res.send('something went wrong'));
    });

usersRouter.route("/:id").delete((req, res) => {
    User.deleteOne({_id: req.params.id}, (err, user) => {
        if (err) return res.send(err);
        return res.send(user);
    });
});

export default usersRouter