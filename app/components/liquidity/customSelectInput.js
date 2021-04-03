/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Img } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import styles from '../../styles/custom-select-box.css';
import { tokenWhere } from '../../utils/constants';
import BNBImage from '../../assets/bnb.svg';
import ETHImage from '../../assets/eth.svg';
import RGPImage from '../../assets/rgp.svg';


const CustomSelectInput = ({
  selectingToken,
  defaultSelect,
  selectedToken,
  setSelectedToken,
}) => {
  const [showSpinList, setShowSpinList] = useState(false);
  const [defaultSelectText, setDefaultSelectText] = useState(
    selectingToken[defaultSelect],
  );
  // This method handles the display of option list
  const handleListDisplay = () => {
    setShowSpinList(!showSpinList);
  };
  const handleOptionClick = e => {
    const obj = tokenWhere(e.target.getAttribute('data-id'));
    setDefaultSelectText(obj);
    setShowSpinList(false);
    selectedToken(obj);
    setSelectedToken(obj);
  };
  return (
    <>
      <Flex alignItems="center">
        <div className={styles.customSelectContainer}>
          <div
            className={
              showSpinList
                ? `${styles.selectedText} ${styles.active}`
                : `${styles.selectedText}`
            }
            role="button"
            onClick={handleListDisplay}
          >
            <div>
              {' '}
              {defaultSelectText.symbol === 'BUSD' && <BNBImage mr="3" />}
              {defaultSelectText.symbol === 'WETH' && <ETHImage mr="3" />}
              {defaultSelectText.symbol === 'RGP' && <RGPImage mr="3" />}{' '}
              {!defaultSelectText.symbol
                ? defaultSelectText.name
                : defaultSelectText.symbol}
            </div>
          </div>
          {showSpinList && (
            <ul className={styles.selectOptions}>
              {selectingToken.map(option => (
                <li
                  className={styles.customSelectOption}
                  data-id={option.symbol}
                  key={option.symbol}
                  onClick={handleOptionClick}
                >
                  {option.symbol === 'BUSD' && <BNBImage mr="3" />}
                  {option.symbol === 'WETH' && <ETHImage mr="3" />}
                  {option.symbol === 'RGP' && <RGPImage mr="3" />}{' '}
                  {!option.symbol
                    ? `${option.name}`
                    : `${option.symbol}: `}{' '}
                  {option.balance}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Flex>
    </>
  );
};
CustomSelectInput.propTypes = {
  selectingToken: PropTypes.array.isRequired,
  defaultSelect: PropTypes.number.isRequired,
  selectedToken: PropTypes.func,
  setSelectedToken: PropTypes.func,
};
export default CustomSelectInput;
