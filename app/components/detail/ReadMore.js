/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Text } from '@chakra-ui/react';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Text fontSize="14px" color="white" lineHeight={6}>
      {isReadMore
        ? text
          .split(/\s+/)
          .slice(0, 0)
          .join(' ')
        : text}
      <span
        style={{
          cursor: 'pointer',
          display: 'block',
          width: '100 %',
          height: '29px',
          background: 'rgba(74, 70, 104, 0.2)',
          position: 'relative',
          textAlign: 'end',
          padding: '2px',
        }}
        onClick={toggleReadMore}
        className="read-or-hide"
      >
        {isReadMore ? '...READ MORE' : 'SHOW LESS'}
      </span>
    </Text>
  );
};
export default ReadMore;
