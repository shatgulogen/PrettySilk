import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';

function ProductPage() {
    const [product, setProducts] = useState([]);
    const params = useParams();
    const { slug } = params;
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `http://localhost:5000/api/products/slug/${slug}`
            );
            setProducts(result.data);
        };
        fetchData();
    }, [slug]);
    const { state, dispatch: contextDispatch } = useContext(Store);
    const addToCartHelper = () => {
        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity: 1 },
        });
    };
    return (
        <div>
            <h1>{slug}</h1>
            <Row>
                <Col md={6}>
                    <img
                        className="img-large"
                        src={product.image}
                        alt={product.name}></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Pirce : ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description:
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.inventoryCount > 0 ? (
                                                <Badge bg="success">
                                                    In Stock
                                                </Badge>
                                            ) : (
                                                <Badge bg="danger">
                                                    Unavailable
                                                </Badge>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.inventoryCount > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button
                                                onClick={addToCartHelper}
                                                variant="primary">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default ProductPage;
