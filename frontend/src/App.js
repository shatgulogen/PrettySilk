import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <a href="/">PrettySilk</a>
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/product/:slug"
                            element={<ProductPage />}
                        />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
