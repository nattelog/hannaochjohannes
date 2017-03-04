import React from 'react';
import Section from './Section';
import './MapSection.css';
import olives from '../../public/img/small-olives.png';

export default class MapSection extends React.Component {
  render() {
    const { el } = this.props;
    const APIKey = 'AIzaSyCwPasuJMvTFO_uc3yH6iZe7DzwzXRCGOE';
    const src = `https://www.google.com/maps/embed/v1/directions?key=${APIKey}&origin=Sockenkyrkan,+Hallsberg&destination=Betaniaförsamlingen,+Åbytorp`;
    const config = {
      frameBorder: 0,
      src
    };

    return (
      <Section customClassName="map-section" el={el}>
        <div className="row">
          <h1>Karta och vägbeskrivning</h1>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <h2>Vigsel</h2>
            <a
              href="https://www.svenskakyrkan.se/hallsberg/sockenkyrkan"
            >
              Sockenkyrkan, Hallsberg
            </a>
            <p>Kyrkogatan 1, Hallsberg</p>
          </div>
          <div className="col-sm-2">
            <img src={olives} />
          </div>
          <div className="col-sm-5">
            <h2>Fest</h2>
            <a
              href="http://www.betaniakyrkan.nu/"
            >
              Betaniakyrkan, Åbytorp
            </a>
            <p>Portföljgatan 2, Kumla</p>
          </div>
        </div>
        <iframe {...config} />
      </Section>
    );
  }
}
