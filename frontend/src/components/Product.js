import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
    const { product } = props;
    const { state, dispatch: contextDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHelper = async (item) => {
        const itemAlreadyExist = cartItems.find((x) => x._id === product._id);
        const quantity = itemAlreadyExist ? itemAlreadyExist.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.inventoryCount < quantity) {
            window.alert(
                'We are trully sorry. This scarf was the best-selling item in our store and it sold out at the moment. Please check back in a week or check out your other options.'
            );
            return;
        }
        contextDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                />
                <Card.Text>{product.price}</Card.Text>
                {product.inventoryCount === 0 ? (
                    <Button variant="light" disabled>
                        Out of stock
                    </Button>
                ) : (
                    <Button onClick={() => addToCartHelper(product)}>
                        Add to cart
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}
export default Product;
