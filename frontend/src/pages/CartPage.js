import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartPage() {
    const navigate = useNavigate();
    const { state, dispatch: contextDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const currentData = axios
            .get(`/api/products/${item._id}`)
            .then((quantity) => {
                if (currentData.inventoryCount < quantity) {
                    window.alert(
                        'We are trully sorry. This scarf was the best-selling item in our store and it sold out at the moment. Please check back in a week or check out your other options.'
                    );
                    return;
                }
            });
        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    const removeItemHandler = (item) => {
        contextDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    return (
        <div>
            <Helmet>
                <title>My Shopping Cart</title>
            </Helmet>
            <h1>My Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded img-thumbnail"></img>{' '}
                                        <Link to={`/product/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={3}>
                                        <Button
                                            onClick={() =>
                                                updateCartHandler(
                                                    item,
                                                    item.quantity - 1
                                                )
                                            }
                                            variant="light"
                                            disabled={item.quantity === 1}>
                                            <i className="fas fa-minus-circle"></i>
                                        </Button>{' '}
                                        <span>{item.quantity}</span>{' '}
                                        <Button
                                            onClick={() =>
                                                updateCartHandler(
                                                    item,
                                                    item.quantity + 1
                                                )
                                            }
                                            variant="light"
                                            disabled={
                                                item.quantity ===
                                                item.inventoryCount
                                            }>
                                            <i className="fas fa-plus-circle"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3}>{item.price}</Col>
                                    <Col md={2}>
                                        <Button
                                            onClick={() =>
                                                removeItemHandler(item)
                                            }
                                            variant="light">
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {/* flush gets rid of the border around it */}
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal (
                                        {cartItems.reduce(
                                            (accumulator, current) =>
                                                accumulator + current.quantity,
                                            0
                                        )}{' '}
                                        items) : $
                                        {cartItems.reduce(
                                            (accumulator, current) =>
                                                accumulator +
                                                current.price *
                                                    current.quantity,
                                            0
                                        )}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}>
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
