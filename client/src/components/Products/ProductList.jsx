import { useState, useEffect } from "react";
import SearchBar from "../Search/SearchBar";
import "./ProductList.css"; // Import the CSS file
import { ToastContainer } from "react-toastify";

function ProductList({ products, addToCart }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list">
      <h3>Products</h3>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.imageUrl} alt="product image" />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
