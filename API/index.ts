import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import mongoDb from "./mongoDb";
import usersRouter from "./routers/users";
import config from "./config";
import path from "path";
import categoriesRouter from "./routers/categories";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.use('/public', express.static(path.join(__dirname, 'public')));

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));


