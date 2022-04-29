import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Shatgul',
            email: 'admin@test.com',
            password: bcrypt.hashSync('HelloShatgul'),
            isAdmin: true,
        },
        {
            name: 'Oreo',
            email: 'user@test.com',
            password: bcrypt.hashSync('HelloOreo'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Eloise',
            slug: 'Eloise-scarf',
            category: 'Scarfs',
            image: '/images/1.jpg',
            price: 59,
            inventoryCount: 15,
            brand: 'PrettySilk',
            rating: 4.5,
            numReviews: 10,
            description:
                'Elegant floral soft white and black 100% silk scarf with a measurement of 185cm * 15cm',
        },
        {
            name: 'Alize',
            slug: 'Alize-scarf',
            category: 'Scarfs',
            image: '/images/2.jpg',
            price: 55,
            inventoryCount: 0,
            brand: 'PrettySilk',
            rating: 4.7,
            numReviews: 18,
            description:
                'Elegant floral grey and black tones 100% silk scarf with a measurement of 185cm * 15cm',
        },
        {
            name: 'Amélie',
            slug: 'Amélie-scarf',
            category: 'Scarfs',
            image: '/images/4.jpg',
            price: 49,
            inventoryCount: 10,
            brand: 'PrettySilk',
            rating: 5,
            numReviews: 10,
            description:
                'Elegant soft blue and cream 100% silk scarf with a measurement of 50cm * 50cm',
        },
        {
            name: 'Elania',
            slug: 'Elania-scarf',
            category: 'Scarfs',
            image: '/images/3.jpg',
            price: 59,
            inventoryCount: 19,
            brand: 'PrettySilk',
            rating: 4.9,
            numReviews: 12,
            description:
                'Elegant floral soft pink and grey 100% silk scarf with a measurement of 185cm * 15cm',
        },
        {
            name: 'Audrey',
            slug: 'Audrey-scarf',
            category: 'Scarfs',
            image: '/images/5.jpg',
            price: 49,
            inventoryCount: 20,
            brand: 'PrettySilk',
            rating: 5.0,
            numReviews: 7,
            description:
                'Elegant bright orange luxury 100% silk scarf with a measurement of 185cm * 15cm',
        },
        {
            name: 'Isabelle',
            slug: 'Isabelle-scarf',
            category: 'Scarfs',
            image: '/images/6.jpg',
            price: 63,
            inventoryCount: 5,
            brand: 'PrettySilk',
            rating: 4.8,
            numReviews: 17,
            description:
                'Elegant soft blue, pink and white tone 100% silk scarf with a measurement of 185cm * 15cm',
        },
        {
            name: 'Juliette',
            slug: 'Juliette-scarf',
            category: 'Scarfs',
            image: '/images/7.jpg',
            price: 71,
            inventoryCount: 8,
            brand: 'PrettySilk',
            rating: 4.9,
            numReviews: 123,
            description:
                'Elegant yellow tone 100% silk scarf with a measurement of 185cm * 15cm',
        },
        {
            name: 'Vivienne',
            slug: 'Vivienne-scarf',
            category: 'Scarfs',
            image: '/images/8.jpg',
            price: 63,
            inventoryCount: 25,
            brand: 'PrettySilk',
            rating: 5.0,
            numReviews: 24,
            description:
                'Elegant brown tone polkadot 100% silk scarf with a measurement of 185cm * 15cm',
        },
    ],
};

export default data;
