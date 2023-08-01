import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const lengthTooltip = (
  <Tooltip id="length-tooltip">Enter the length in inches</Tooltip>
);

const widthTooltip = (
  <Tooltip id="length-tooltip">Enter the width in inches</Tooltip>
);

const heightTooltip = (
  <Tooltip id="length-tooltip">Enter the height in inches</Tooltip>
);

const Product = ({
  product,
  fetchProducts,
  idx,
  setErrors,
  setSuccess,
  setCreateMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [length, setLength] = useState(product.length);
  const [width, setWidth] = useState(product.width);
  const [height, setHeight] = useState(product.height);
  const [weight, setWeight] = useState(product.weight);

  const handleEdit = (productId) => {
    if (window.confirm('Confirm to edit?')) {
      editProduct(productId);
      setEditMode(false);
    }
  };

  const validForm = () => {
    const errors = [];

    if (!name.trim()) {
      errors.push('Name is required');
    }

    if (!type.trim()) {
      errors.push('Type is required');
    }

    if (
      isNaN(parseFloat(length)) ||
      isNaN(parseFloat(width)) ||
      isNaN(parseFloat(height)) ||
      isNaN(parseFloat(weight))
    ) {
      errors.push('Length, width, height and weight must be numbers');
    }

    setErrors(errors);
    return !(errors.length > 0);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure to Delete?')) {
      deleteProduct(productId);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/products/${id}`);
      setSuccess((prevState) => [...prevState, 'Product Delete Success']);
      fetchProducts();
    } catch (error) {
      setErrors((prevState) => [...prevState, error.message]);
    }
  };

  const editProduct = async (id) => {
    if (!validForm()) return;

    const body = {
      name,
      type,
      length,
      width,
      height,
      weight,
    };
    try {
      await axios.patch(`http://localhost:3001/api/v1/products/${id}`, body);
      setSuccess((prevState) => [...prevState, 'Product Update Success']);
      fetchProducts();
    } catch (error) {
      console.log(error);
      setErrors((prevState) => [...prevState, error.message]);
    }
  };

  return (
    <>
      <tr idx={product._id.$oid}>
        <td>{idx + 1}</td>
        <td>
          {editMode ? (
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            name
          )}
        </td>
        <td>
          {editMode ? (
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          ) : (
            type
          )}
        </td>
        <td>
          {editMode ? (
            <div className="d-flex align-items-center">
              <OverlayTrigger placement="top" overlay={lengthTooltip}>
                <Form.Control
                  type="text"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  style={{ width: '60px' }}
                />
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={widthTooltip}>
                <Form.Control
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  style={{ width: '60px' }}
                />
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={heightTooltip}>
                <Form.Control
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  style={{ width: '60px' }}
                />
              </OverlayTrigger>
            </div>
          ) : (
            <>
              {length}l x {width}w x {height}h
            </>
          )}
        </td>
        <td>
          {editMode ? (
            <Form.Control
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          ) : (
            product.weight
          )}
        </td>
        <td>
          {!editMode && (
            <Button variant="primary" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}{' '}
          {!editMode && (
            <Button
              variant="outline-danger"
              onClick={() => handleDelete(product._id.$oid)}
            >
              Delete
            </Button>
          )}
          {editMode && (
            <Badge
              pill
              bg="success"
              onClick={() => handleEdit(product._id.$oid)}
            >
              Save
            </Badge>
          )}{' '}
          {editMode && (
            <Badge pill bg="dark" onClick={() => setEditMode(false)}>
              Cancel
            </Badge>
          )}
        </td>
      </tr>
    </>
  );
};

export default Product;
