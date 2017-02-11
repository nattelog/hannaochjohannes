import React from 'react';
import { ease } from '../easing';

export default class ScrollLink extends React.Component {
  scrollTo() {
    const { target } = this.props;
    const top = target.offsetTop;

    const start = window.pageYOffset;
    const end = top - 110; // static navbar height

    ease(
      start,
      end,
      pos => window.scrollTo(0, pos),
      pos => window.scrollTo(0, pos)
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div onClick={() => this.scrollTo()}>
        {children}
      </div>
    );
  }
}
