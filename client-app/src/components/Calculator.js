import React, { useState } from 'react';
import KeyPadComponent from './KeypadComponent';
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
const Calculator = ({ values, setValues }) => {
  const [activeField, setActiveField] = useState(null);

  const onClick = (button) => {
    if (!activeField) return;

    switch (button) {
      case '=':
        break;
      case 'C':
        reset();
        break;
      case 'CE':
        backspace();
        break;
      default:
        setValues((prevState) => ({
          ...prevState,
          [activeField]: prevState[activeField] + button,
        }));
    }
  };

  const reset = () => {
    if (!activeField) return;

    setValues((prevState) => ({
      ...prevState,
      [activeField]: '',
    }));
  };

  const backspace = () => {
    if (!activeField) return;

    setValues((prevState) => ({
      ...prevState,
      [activeField]: prevState[activeField].slice(0, -1),
    }));
  };

  const handleFieldClick = (field) => {
    setActiveField(field);
  };

  return (
    <div>
      <div className="calculator-body">
        <div className="d-flex mb-3">
          {Object.keys(values).map((key) => (
            <div
              class={
                activeField === key &&
                'rounded-top border-primary border-top border-primary'
              }
            >
              <Form.Control
                key={key}
                type="text"
                value={values[key]}
                onClick={() => handleFieldClick(key)}
                onFocus={() => handleFieldClick(key)}
              />
              <Form.Text className="text-muted">
                <b>{key}</b>
              </Form.Text>
            </div>
          ))}
        </div>
        <KeyPadComponent onClick={onClick} />
      </div>
    </div>
  );
};

export default Calculator;
