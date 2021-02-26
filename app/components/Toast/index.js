/**
 *
 * Toast
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withToastManager } from 'react-toast-notifications';

function Toast(props) {
  const { showNotice, message } = props.notice;
  const { toastManager } = props;
  useEffect(() => {
    if (showNotice) {
      const content = (
        <div>
          <strong>{message.title}</strong>
          <div>{message.body}</div>
        </div>
      );
      toastManager.add(content, {
        appearance: message.type,
      });
    }
  }, [showNotice]);
  return null;
}

Toast.propTypes = {
  showNotice: PropTypes.bool,
  message: PropTypes.object,
};

export default withToastManager(Toast);
