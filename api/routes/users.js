import express from 'express';

const usersRouter = express.Router({mergeParams: true});

usersRouter.route('/')
    .get((req, res) => {
        res.send('users get request');
    });

export default usersRouter