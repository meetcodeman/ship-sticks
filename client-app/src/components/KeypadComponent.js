import React from 'react';

const KeyPadComponent = ({ onClick }) => {
  const buttonElements = [
    { name: '1', symbol: '1' },
    { name: '2', symbol: '2' },
    { name: '3', symbol: '3' },
    { name: '4', symbol: '4' },
    { name: '5', symbol: '5' },
    { name: '6', symbol: '6' },
    { name: '7', symbol: '7' },
    { name: '8', symbol: '8' },
    { name: '9', symbol: '9' },
    { name: '-', symbol: '-' },
    { name: '0', symbol: '0' },
    { name: '.', symbol: '.' },
    { name: 'C', symbol: 'C' },
    { name: 'CE', symbol: 'CE' },
    { name: '=', symbol: '=' },
  ];

  return (
    <div className="button-calculator">
      {buttonElements.map((button) => (
        <button
          className="key-calculator"
          key={button.name}
          name={button.name}
          onClick={() => onClick(button.name)}
        >
          {button.symbol}
        </button>
      ))}
    </div>
  );
};

export default KeyPadComponent;
