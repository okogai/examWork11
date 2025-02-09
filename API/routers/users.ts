import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
    try {
        const { username, password, displayName, phoneNumber } = req.body;

        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            res.status(400).send({ message: 'Phone number already exists' });
            return;
        }
        const user = new User({
            username,
            password,
            displayName,
            phoneNumber
        });

        user.generateToken();

        await user.save();
        res.send({message: 'Successfully registered', user});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).send({error: 'User not found'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        user.generateToken();
        await user.save();

        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong'});
            return;
        }
        res.send({message: 'Username and password is correct', user});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;

    if (!userFromAuth){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    try {
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'Success logout'})
        }
    } catch (e){
        next(e);
    }
});

export default usersRouter;