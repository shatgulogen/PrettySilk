import data from '../data';

function HomePage() {
    return (
        <div>
            <h1>Featured Products</h1>
            <div classNames="products">
                {data.products.map((product) => (
                    <div className="product" key={product.slug}>
                        <a href={`/product/${product.slug}`}>
                            <img src={product.image} alt={product.name} />
                        </a>
                        <div className="product-info">
                            <a href={`/product/${product.slug}`}>
                                <p>{product.name}</p>
                            </a>
                            <p>
                                <strong>{product.price}</strong>
                            </p>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HomePage;
