/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import Navbar from "./components/NavBar/NavBar";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart";
import SearchBar from "./components/Search/SearchBar";
import PaymentForm from "./components/Payment/PaymentForm";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PhofJRtoqmg9Y2cedNrDonsTnlL935F7VtmD8Aphshi1uiMkbhWZlYiMHgUThEFMoSsN44itVoADb78xcxUBfMA00IjzPhCdc"
);

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/products");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/auth/check"
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error checking authentication:", error.message);
      }
    };

    checkAuth();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success("Product added to cart successfully!", {
      className: "custom-toast custom-toast-success",
      progressClassName: "custom-progress",
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/api/auth/logout");
      setUser(null);
      setCartItems([]);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <Router>
      <Navbar cartItems={cartItems} user={user} handleLogout={handleLogout} />
      {loading ? (
        <div className="loader-wrapper">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#bf20df", "#c64cdf"]}
          />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<ProductList products={products} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            }
          />
          <Route
            path="/search"
            element={<SearchBar onSearch={(query) => {}} />}
          />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm
                  totalAmount={cartItems.reduce(
                    (acc, item) => acc + item.price,
                    0
                  )}
                  onPaymentSuccess={() => {
                    setCartItems([]);
                    console.log("Payment successful!");
                  }}
                />
              </Elements>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
