import React from 'react';
import './Section.css';

export default class Section extends React.Component {
  render() {
    const { children, el, customClassName } = this.props;

    return (
      <section ref={el} className={customClassName} >
        <div className="container">
          {children}
        </div>
      </section>
    );
  }
}
