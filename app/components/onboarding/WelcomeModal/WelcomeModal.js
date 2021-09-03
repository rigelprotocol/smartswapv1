import React from 'react';
// import './WelcomeModal.css';
import styles from '../../../styles/WelcomeModal.css';
import FontAwesome from 'react-fontawesome';

const Modal = props => {
  const { closeModal } = props;

  const closeicon = () => (
    <FontAwesome
      name="times"
      onClick={closeModal}
      style={{
        color: '#fff',
        padding: '5px',
        cursor: 'pointer',
        backgroundColor: '#6849bc',
        border: 0,
        position: 'absolute',
        fontWeight: 'lighter',
        top: '-30px',
        right: '-0.1rem',
        borderRadius: '50%',
        fontSize: 'x-small',
      }}
    />
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {closeicon()}
        <p>Welcome to</p>
        <h1>Rigel Protocol SmartSwap</h1>
        <p>This is a short onboarding walkthrough to help</p>
        <p>you get acquainted with the platform and find</p>
        <p>your way around</p>

        {props.children}
      </div>
    </div>
  );
};

export default Modal;
