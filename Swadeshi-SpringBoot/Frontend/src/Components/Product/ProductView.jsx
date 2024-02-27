import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import Layout from '../../Layout/Layout';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8065/api/products/${params.productId}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const handleAddToCart = (id) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if(!auth){
      navigate("/login");
    }
    else {
      setProductId(id)
     addToCart(auth.username);
    }
  }



  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image && `data:image/png;base64,${product.image}`} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
        <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <p>State:{product.stateName}</p>
          <p>Quantity:{product.quantity}</p>
          <p>Category:{product.categoryName}</p>
          <p>Seller Id:{product.sellerId}</p>


          
          <br />
          <button className="btn btn-danger" onClick={() => handleAddToCart(p.id)}>
                  ADD TO CART
                </button>
          <button  className="btn btn-success"  onClick={() => navigate(`/buy/${product.id}`)}>Buy Now</button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProductDetails;
