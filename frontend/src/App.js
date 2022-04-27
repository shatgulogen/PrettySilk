import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';

function App() {
    const { state, dispatch: contextDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        contextDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
    };
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <header>
                    <Navbar bg="dark" variant="pink">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>PrettySilk</Navbar.Brand>
                            </LinkContainer>
                            <Nav className="me-auto">
                                <Link to="/cart" className="nav-link">
                                    Cart
                                    {cart.cartItems.length > 0 && (
                                        <Badge pill bg="ahooh">
                                            {cart.cartItems.reduce(
                                                (accumulator, current) =>
                                                    accumulator +
                                                    current.quantity,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Link>
                                {userInfo ? (
                                    <NavDropdown
                                        title={userInfo.name}
                                        id="basic-nav-dropdown">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                User Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orderhistory">
                                            <NavDropdown.Item>
                                                Order History
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <Link
                                            className="dropdown-item"
                                            to="#signout"
                                            onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </NavDropdown>
                                ) : (
                                    <Link className="nav-link" to="/signin">
                                        Sign In
                                    </Link>
                                )}
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container>
                        <Container className="mt-5">
                            <Routes>
                                <Route
                                    path="/product/:slug"
                                    element={<ProductPage />}
                                />
                                <Route path="/cart" element={<CartPage />} />
                                <Route
                                    path="/signin"
                                    element={<SigninPage />}
                                />
                                <Route path="/" element={<HomePage />} />
                            </Routes>
                        </Container>
                    </Container>
                </main>
                <footer>
                    <div className="text-center">
                        @ 2022 PrettySilk, LLC All Rights Reserved
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
