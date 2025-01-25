import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import config from './config';
import User from './models/User';
import Category from './models/Category';
import Item from './models/Item';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('items');
    } catch (e) {
        console.log('Collections were not present, skipping drop.');
    }

    const [user1, user2] = await User.create(
        {
            username: 'john_doe',
            password: '123456',
            displayName: 'John Doe',
            phoneNumber: '1234567890',
            token: randomUUID(),
        },
        {
            username: 'jane_smith',
            password: '654321',
            displayName: 'Jane Smith',
            phoneNumber: '9876543210',
            token: randomUUID(),
        }
    );

    const [phones, laptops, tvs, smartwatches] = await Category.create(
        { title: 'Телефоны' },
        { title: 'Ноутбуки' },
        { title: 'Телевизоры' },
        { title: 'Смарт-часы' }
    );

    await Item.create(
        {
            title: 'iPhone 13',
            description: 'Смартфон Apple iPhone 13, 128GB, черный',
            image: '/public/images/iphone13.jpg',
            price: 75000,
            category: phones._id,
            seller: user1._id,
        },
        {
            title: 'Samsung Galaxy S21',
            description: 'Флагман Samsung, 256GB, серый',
            image: '/public/images/galaxyS21.jpg',
            price: 70000,
            category: phones._id,
            seller: user2._id,
        },
        {
            title: 'Xiaomi Redmi Note 10',
            description: 'Бюджетный смартфон Xiaomi, 64GB, синий',
            image: '/public/images/redmiNote10.jpg',
            price: 15000,
            category: phones._id,
            seller: user1._id,
        },
        {
            title: 'MacBook Pro 16"',
            description: 'Ноутбук Apple MacBook Pro, M1 Pro, серый',
            image: '/public/images/macbookPro16.jpg',
            price: 250000,
            category: laptops._id,
            seller: user2._id,
        },
        {
            title: 'Dell XPS 13',
            description: 'Ультрабук Dell, Intel i7, 16GB RAM',
            image: '/public/images/dellXPS13.jpg',
            price: 120000,
            category: laptops._id,
            seller: user1._id,
        },
        {
            title: 'HP Pavilion 15',
            description: 'Бюджетный ноутбук HP, AMD Ryzen 5',
            image: '/public/images/hpPavilion15.jpg',
            price: 60000,
            category: laptops._id,
            seller: user2._id,
        },
        {
            title: 'Samsung QLED 55"',
            description: 'Телевизор Samsung QLED, 4K UHD, Smart TV',
            image: '/public/images/samsungQLED.jpg',
            price: 80000,
            category: tvs._id,
            seller: user1._id,
        },
        {
            title: 'LG OLED 65"',
            description: 'Телевизор LG OLED, 4K HDR, Smart TV',
            image: '/public/images/lgOLED.jpg',
            price: 120000,
            category: tvs._id,
            seller: user2._id,
        },
        {
            title: 'Sony Bravia 50"',
            description: 'Телевизор Sony, 4K UHD, Smart TV',
            image: '/public/images/sonyBravia.jpg',
            price: 70000,
            category: tvs._id,
            seller: user1._id,
        },
        {
            title: 'Apple Watch Series 8',
            description: 'Смарт-часы Apple Watch, 41mm, GPS',
            image: '/public/images/appleWatch.jpg',
            price: 40000,
            category: smartwatches._id,
            seller: user2._id,
        },
        {
            title: 'Samsung Galaxy Watch 5',
            description: 'Смарт-часы Samsung, 44mm, LTE',
            image: '/public/images/galaxyWatch.jpg',
            price: 30000,
            category: smartwatches._id,
            seller: user1._id,
        },
        {
            title: 'Xiaomi Mi Band 7',
            description: 'Фитнес-браслет Xiaomi, AMOLED дисплей',
            image: '/public/images/miBand7.jpg',
            price: 5000,
            category: smartwatches._id,
            seller: user2._id,
        }
    );

    await db.close();
};

run().catch(console.error);
