import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Product from './Product';
import CreateProduct from './CreateProduct';
import SearchProduct from './SearchProduct';

const columns = ['#', 'Name', 'Type', 'Dimensions', 'Weight', 'Actions'];

function Products() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [recentlySearched, setRecentlySearched] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setErrors([]);
      setSuccess([]);
    }, 5000);
  }, [errors, success]);

  const fetchProducts = async () => {
    try {
      setErrors([]);
      const res = await axios.get('http://localhost:3001/api/v1/products');
      setProducts(res.data);
      setCreateMode(false);
    } catch (error) {
      setErrors((prevState) => [...prevState, error.message]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {errors.map((error, idx) => (
        <Alert key={idx} variant="danger">
          {error}
        </Alert>
      ))}

      {success.map((success, idx) => (
        <Alert key={idx} variant="success">
          {success}
        </Alert>
      ))}

      {recentlySearched && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setRecentlySearched(null)}
        >
          Use this : {recentlySearched.name}
        </Alert>
      )}
      <div class="mb-3 d-flex justify-content-between">
        <h4>Products</h4>
        <div>
          <CreateProduct
            setErrors={setErrors}
            setSuccess={setSuccess}
            fetchProducts={fetchProducts}
            setCreateMode={setCreateMode}
          />{' '}
          <SearchProduct
            setErrors={setErrors}
            setRecentlySearched={setRecentlySearched}
          />
        </div>
      </div>
      <Table striped bordered hover style={{ backgroundColor: 'white' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <Product
              setErrors={setErrors}
              setSuccess={setSuccess}
              product={product}
              fetchProducts={fetchProducts}
              idx={idx}
              key={idx}
              setCreateMode={setCreateMode}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Products;
