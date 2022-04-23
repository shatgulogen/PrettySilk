import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-container">
                <header>
                    <Navbar bg="dark" variant="pink">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>PrettySilk</Navbar.Brand>
                            </LinkContainer>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container>
                        <Routes>
                            <Route
                                path="/product/:slug"
                                element={<ProductPage />}
                            />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
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
