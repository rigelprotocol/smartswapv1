import React from 'react';

const Step = ({ title, description, description2 }) => {
  return (
    <div className="step">
      <p style={{ fontWeight: 'bold' }} className="step__title">
        {title}
      </p>
      <p
        style={{ fontWeight: 'light', fontSize: 'small', lineHeight: '1.2rem' }}
        className="step__description"
      >
        {!description2 ? (
          description
        ) : (
          <p
            style={{
              fontWeight: 'light',
              fontSize: 'small',
              lineHeight: '1.2rem',
            }}
          >
            Click here to view the <b>name</b>, <b>circulation supply</b> and{' '}
            <b>description</b> about the tokens being swapped
          </p>
        )}
      </p>
    </div>
  );
};

export default Step;
