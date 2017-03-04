import React from 'react';
import Section from './Section';
import './ImageDividerSection.css';
import kiss from '../../public/img/kiss.png';

export default class ImageDividerSection extends React.Component {
  render() {
    return (
      <Section customClassName="image-divider-section">
        <div className="image-container">
          <img src={kiss} />
        </div>
      </Section>
    );
  }
}
