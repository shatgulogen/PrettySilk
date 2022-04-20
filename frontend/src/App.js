import data from './data';

function App() {
    return (
        <div>
            <header>
                <a href="/">PrettySilk</a>
            </header>
            <main>
                <h1>Featured Products</h1>
                <div classNames="products">
                    {data.products.map((product) => (
                        <div className="product" key={product.slug}>
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
