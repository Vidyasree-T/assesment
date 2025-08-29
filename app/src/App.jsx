import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

function Product() {
  const [product, setProduct] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate=useNavigate();
  
 useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setLoading(false);
      });
  }, []);
  if(loading){
    return<div>loading products..</div>;
  }
  return(
    <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {product.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <button onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </>
  )
}
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => {
        setProduct(json);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="200" />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
function App(){
  return(
    <>
    <h1>E-Commerce</h1>
    <Router>
      <Routes>
        <Route path='/' element={<Product/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
      </Routes>
    </Router>
    </>
  )
}
export default App
