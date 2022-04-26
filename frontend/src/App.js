import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from './Store';

function App() {
    const { state } = useContext(Store);
    const { cart } = state;
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
                                            {cart.cartItems.length}
                                        </Badge>
                                    )}
                                </Link>
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
