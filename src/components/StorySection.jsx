import React from 'react';
import Section from './Section';
import './StorySection.css';
import olives from '../../public/img/olives.png';

export default class StorySection extends React.Component {
  render() {
    const { el } = this.props;

    return (
      <Section el={el} customClassName="story-section">
        <h1>Vår story</h1>
        <p>
          För mer än 5 år sedan träffades vi för första gången i Pingstkyrkan i
          Kumla. Men det var inte förrän ungefär 2 år senare vi förstod att vi
          både tyckte om varandra lite extra. Vi blev tillsammans den 15 juni
          2014. Under mer än 2 år som ett par växte något otroligt starkt mellan
          oss, därför bestämde vi oss för att ta förhållandet steget längre och
          vi valde att förlova oss. Detta skedde den 22 september på en strand
          på Mallorca till vågornas kluckande och under stjärnklar himmel. Nu,
          den 5 augusti, blir vi ett på riktigt.

          Välkomna att fira denna dag med oss!
        </p>
        <img src={olives} />
      </Section>
    );
  }
}
