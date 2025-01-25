import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;