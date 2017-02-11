import React from 'react';

export default class Section extends React.Component {
  render() {
    const { children, el } = this.props;

    return (
      <section
        style={{ height: 1000, border: '1px solid black' }}
        ref={el}
      >
        <div className="container">
          {children}
        </div>
      </section>
    );
  }
}
