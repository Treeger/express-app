import express from 'express';
const models = require('../models');

const usersRouter = express.Router({mergeParams: true});

usersRouter.route('/')
    .get((req, res) => {
        models.User.findAll().then(user => {
            return res.send(user);
        }).catch(e => res.send('something went wrong'));
    });

export default usersRouter