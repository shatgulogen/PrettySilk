import express from 'express';
const app = express();
import cors from 'cors';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mainRouter from './routes/mainRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
//Convert the form data in the post request a json object inside req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.MONGO_URI;
const secret = process.env.SECRET;
mongoose
    .connect(uri)
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err.message);
    });

const client = new MongoClient(uri);
let db = null;
async function run() {
    await client.connect();
    db = client.db('data');
    console.log('Connected successfully to server');
}
run().catch(console.log);

app.use('/api/main', mainRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// app.post('/api/products', (req, res) => {
//     const singleData = {
//         name: req.body.name,
//         slug: req.body.slug,
//         category: req.body.category,
//         image: req.body.image,
//         price: req.body.price,
//         inventoryCount: req.body.inventoryCount,
//         brand: req.body.brand,
//         rating: req.body.rating,
//         numReviews: req.body.numReviews,
//         description: req.body.description,
//     };

//     db.collection('data')
//         .insertOne(singleData)
//         .then((result) => {
//             console.log(result);
//             res.json({ status: 'ok' });
//         });
// });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'));

    app.get('/*', (req, res) => {
        res.sendFile('../frontend/build/index.html');
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
