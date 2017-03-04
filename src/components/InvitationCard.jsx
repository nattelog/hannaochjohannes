import React from 'react';
import image from '../../public/img/invitation-card.png';
import './InvitationCard.css';

export default class InvitationCard extends React.Component {
  render() {
    return (
      <div className="invitation-card" >
        <p>Välkommen på vigsel mellan</p>
        <img src={image} />
        <div>
          <p>5 augusti 2017 14:00</p>
          <p>Hallsbergs Sockenkyrka</p>
        </div>
      </div>
    )
  }
}
