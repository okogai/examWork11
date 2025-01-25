import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Item from "../models/Item";
import {imagesUpload} from "../multer";

const itemsRouter = express.Router();

itemsRouter.post('/', auth, imagesUpload.single("image"), async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }
    try {
        const { title, description, price, category } = req.body;

        const item = new Item({
            title,
            description,
            price,
            category,
            seller: user._id,
            image: req.file ? `/public/images/${req.file.filename}` : null,
        });
        await item.save();
        res.status(201).send(item);
    } catch (e) {
        next(e);
    }
});

itemsRouter.get('/', async (req, res, next) => {
    const { category } = req.query;

    try {
        const filter = category ? { category } : {};
        const items = await Item.find(filter);
        res.send(items);
    } catch (e) {
        next(e);
    }
});

itemsRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    if (!user){
        res.status(401).send({error: 'Token not provided!'});
        return;
    }

    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            res.status(404).send({ error: 'Item not found!' });
            return;
        }

        if (!item.seller.equals(user._id)) {
            res.status(403).send({ error: 'Access denied: Not your item!' });
            return;
        }

        await item.deleteOne();
        res.send({ message: 'Item deleted successfully' });
    } catch (e) {
        next(e);
    }
});

export default itemsRouter;