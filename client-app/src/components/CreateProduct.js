import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function CreateProduct({
  setCreateMode,
  setErrors,
  setSuccess,
  fetchProducts,
}) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    length: '',
    width: '',
    height: '',
    weight: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    type: '',
    length: '',
    width: '',
    height: '',
    weight: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      createProduct();
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '') {
        errors[key] = 'This field is required';
        valid = false;
      }
    });
    setFormErrors(errors);
    return valid;
  };

  const createProduct = async () => {
    try {
      await axios.post(`http://localhost:3001/api/v1/products`, formData);
      setSuccess((prevState) => [...prevState, 'Product Update Success']);
      fetchProducts();
      setFormData({
        name: '',
        type: '',
        length: '',
        width: '',
        height: '',
        weight: '',
      });
      handleClose();
    } catch (error) {
      const formattedErrors = Object.entries(error.response.data)
            .map(([key, value]) => `${key} ${value}`)
            .join(', ');

      setErrors((prevState) => [...prevState, formattedErrors]);
    }
  };

  const handleCloseModal = () => {
    setFormErrors({
      name: '',
      type: '',
      length: '',
      width: '',
      height: '',
      weight: '',
    });
    setCreateMode(false);
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.entries(formData).map(([key, value]) => (
              <Form.Group
                key={key}
                className="mb-3"
                controlId={`formBasic${key}`}
              >
                <Form.Label>{`Enter ${
                  key.charAt(0).toUpperCase() + key.slice(1)
                }`}</Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  isInvalid={formErrors[key]}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors[key]}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
            <Button
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleCreate}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" className="mr-2" />
              ) : (
                'Create'
              )}
            </Button>{' '}
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateProduct;
