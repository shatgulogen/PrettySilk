import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';

function HomePage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(
                'http://localhost:5000/api/products'
            );
            setProducts(result.data);
        };
        getData();
    }, []);
    return (
        <div>
            <Helmet>
                <title>PrettySilk</title>
            </Helmet>
            <h1>Featured Products</h1>
            <div className="products">
                <Row>
                    {products.map((product) => (
                        <Col
                            key={product.slug}
                            sm={6}
                            md={4}
                            lg={3}
                            className="mb-3">
                            <Product product={product}></Product>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
export default HomePage;
