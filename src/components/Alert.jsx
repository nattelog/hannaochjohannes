import React from 'react';

export default class Alert extends React.Component {
  render() {
    const { type, enabled, onClose, children } = this.props;
    const alertType = type || 'success';

    if (enabled) {
      return (
        <div
          className={`alert alert-${alertType} alert-dismissable`}
          role="alert"
        >
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {children}
        </div>
      );
    }

    return null;
  }
}
