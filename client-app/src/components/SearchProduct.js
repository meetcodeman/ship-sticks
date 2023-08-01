import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Calculator from './Calculator';
import Alert from 'react-bootstrap/Alert';

function SearchProduct({ setErrors, setRecentlySearched }) {
  const [show, setShow] = useState(false);
  const [result, setResult] = useState();
  const [values, setValues] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReset = () => {
    setValues({
      length: '',
      width: '',
      height: '',
      weight: '',
    });
  };
  const closeModal = (data) => {
    setTimeout(() => {
      setRecentlySearched(data);
      handleClose();
      setResult(null);
    }, 5000);
  };

  const handleSearch = async () => {
    try {
      const queryParams = Object.entries(values)
        .filter(([key, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const res = await axios.get(
        `http://localhost:3001/api/v1/product?${queryParams}`
      );
      setResult(res.data);
      closeModal(res.data);
    } catch (error) {
      setErrors((prevState) => [...prevState, error.message]);
    }
  };
  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Launch Calculator
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Weight and Dimensions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && <Alert variant="success">Use this : {result.name}</Alert>}
          <Calculator values={values} setValues={setValues} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleReset}>
            Reset All
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchProduct;
