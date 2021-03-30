/**
 *
 * Toast
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withToastManager } from 'react-toast-notifications';
import { offNotice } from 'containers/NoticeProvider/actions';
import { connect } from 'react-redux';

function Toast(props) {
  const { showNotice, message } = props.state.notice;
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
        autoDismiss: true,
      });
    }
    props.offNotice();
  }, [showNotice]);
  return null;
}

Toast.propTypes = {
  showNotice: PropTypes.bool,
  message: PropTypes.object,
};

export default connect(
  null,
  { offNotice },
)(withToastManager(Toast));
