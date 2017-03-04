import React from 'react';

export default class Button extends React.Component {
  render() {
    const { children, onClick, disabled, loading } = this.props;
    const loadingText = loading ? ' laddar...' : '';

    return (
      <button
        className="btn btn-default"
        onClick={onClick}
        disabled={disabled || loading}
      >
        {children}
        {loadingText}
      </button>
    );
  }
}
