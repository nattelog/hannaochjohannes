import React from 'react';
import InvitationCard from './InvitationCard'
import './InvitationCardSection.css';

export default class InvitationCardSection extends React.Component {
  render() {
    const { children, el } = this.props;

    return (
      <section ref={el} className="invitation-card-section" >
        <div className="invitation-dots"></div>
        <div className="container">
          <InvitationCard />
        </div>
      </section>
    );
  }
}
