import express from 'express';
const app = express();
import cors from 'cors';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
import dotenv from 'dotenv';
import path from 'path';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

app.use(cors());

const uri = process.env.MONGO_URI;
const secret = process.env.SECRET;

const client = new MongoClient(uri);
let db = null;
async function run() {
    await client.connect();
    db = client.db('data');
    console.log('Connected successfully to server');
}
run().catch(console.log);
app.use(express.json());

app.get('/api/products', (req, res) => {
    const cursor = db.collection('data').find();
    cursor.toArray().then((result) => {
        res.json(result);
    });
});
app.get('/api/products/slug/:slug', (req, res) => {
    db.collection('data')
        .findOne({ slug: req.params.slug })
        .then((product) => {
            if (product) {
                res.send(product);
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        });
});
app.get('/api/product/:id', (req, res) => {
    db.collection('data')
        .findOne({ _id: req.params.id })
        .then((product) => {
            if (product) {
                res.send(product);
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        });
});

app.post('/api/products', (req, res) => {
    const singleData = {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        inventoryCount: req.body.inventoryCount,
        brand: req.body.brand,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
    };

    db.collection('data')
        .insertOne(singleData)
        .then((result) => {
            console.log(result);
            res.json({ status: 'ok' });
        });
});

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
