import React from 'react';
import './ReservationForm.css';
import Button from './Button';

export default class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      option: 'reserve',
      validation: false
    };
    this.addReservationStrategy = this.addReservationStrategy.bind(this);
    this.removeReservationStrategy = this.removeReservationStrategy.bind(this);
    this.reservationStrategies = {
      reserve: this.addReservationStrategy,
      cancel: this.removeReservationStrategy
    };
  }

  addReservationStrategy() {
    const { wishlist, item, reserved } = this.props;
    const { max_reservations } = item;

    return {
      verb: 'reservera',
      verbPassed: 'reserverade',
      send: wishlist.add_reservation,
      getMaxReference: function() {
        return max_reservations - reserved;
      }
    };
  }

  removeReservationStrategy() {
    const { wishlist, reserved } = this.props;

    return {
      verb: 'avboka',
      verbPassed: 'avbokade',
      send: wishlist.remove_reservation,
      getMaxReference: function() {
        return reserved;
      }
    };
  }

  getReservationStrategy() {
    const { option } = this.state;
    return this.reservationStrategies[option]();
  }

  select(e) {
    const { value } = e.target;

    this.setState({
      option: value,
      count: 0
    });
  }

  count(e) {
    const { value } = e.target;
    const { getMaxReference } = this.getReservationStrategy();
    const validation = value > 0 && value <= getMaxReference();

    this.setState({
      count: value,
      validation
    });
  }

  makeCountInput() {
    const { count } = this.state;

    return (
      <input type="text" value={count} onChange={e => this.count(e)} />
    );
  }

  makeSelectInput() {
    const { select } = this.state;

    return (
      <select value={select} onChange={e => this.select(e)}>
        <option value="reserve">reservera</option>
        <option value="cancel">avboka</option>
      </select>
    );
  }

  ok() {
    const { onOK } = this.props;
    const strategy = this.getReservationStrategy();
    const { count } = this.state;

    onOK(strategy, parseInt(count));
  }

  cancel() {
    const { onCancel } = this.props;

    this.setState({
      options: 'reset',
      count: 0
    });
    onCancel();
  }

  render() {
    const { name } = this.props.item;
    const { validation } = this.state;
    const { getMaxReference, verb } = this.getReservationStrategy();

    return (
      <div className="reservation-form">
        <h2>{name}</h2>
        <p>{`Det finns ${getMaxReference()} stycken kvar att ${verb}`}</p>
        <p>
          Jag vill
          {this.makeSelectInput()}
          {this.makeCountInput()}
          st
        </p>
        <div className="control-buttons">
          <Button
            disabled={!validation}
            onClick={() => this.ok()}
          >
            OK
          </Button>
          <Button onClick={() => this.cancel()}>
            Avbryt
          </Button>
        </div>
      </div>
    );
  }
}
