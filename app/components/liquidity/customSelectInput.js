/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import styles from '../../styles/custom-select-box.css';
import BNBImage from '../../assets/bnb.svg';
import TRXImage from '../../assets/trx.svg';
import ETHImage from '../../assets/eth.svg';
import USDTImage from '../../assets/usdt.svg';
import RGPImage from '../../assets/rgp.svg';

const CustomSelectInput = ({
  selectingToken,
  defaultSelect,
  selectedToken,
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
    const obj = selectingToken.filter(
      // eslint-disable-next-line radix
      val => val.id === parseInt(e.target.getAttribute('data-id')),
    )[0];

    setDefaultSelectText(obj);
    setShowSpinList(false);
    selectedToken(obj);
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
            {defaultSelectText.id === 0 ? (
              defaultSelectText.name
            ) : (
              <div>
                {' '}
                {defaultSelectText.img === 'bnb.svg' && <BNBImage mr="3" />}
                {defaultSelectText.img === 'eth.svg' && <ETHImage mr="3" />}
                {defaultSelectText.img === 'trx.svg' && <TRXImage mr="3" />}
                {defaultSelectText.img === 'rgp.svg' && <RGPImage mr="3" />}
                {defaultSelectText.img === 'usdt.svg' && (
                  <USDTImage mr="3" />
                )}{' '}
                {defaultSelectText.name}
              </div>
            )}
          </div>
          {showSpinList && (
            <ul className={styles.selectOptions}>
              {selectingToken.map(option => (
                <li
                  className={styles.customSelectOption}
                  data-id={option.id}
                  key={option.id}
                  onClick={handleOptionClick}
                >
                  {option.img === 'bnb.svg' && <BNBImage mr="3" />}
                  {option.img === 'eth.svg' && <ETHImage mr="3" />}
                  {option.img === 'trx.svg' && <TRXImage mr="3" />}
                  {option.img === 'rgp.svg' && <RGPImage mr="3" />}
                  {option.img === 'usdt.svg' && <USDTImage mr="3" />}{' '}
                  {option.name}
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
};
export default CustomSelectInput;
