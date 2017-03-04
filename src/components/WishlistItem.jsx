import React from 'react';
import './WishlistItem.css';
import ReservationForm from './ReservationForm';
import Button from './Button';
import Alert from './Alert';

export default class WishlistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showReservationForm: false,
      reservationCount: 0,
      loading: false,
      alert: {
        enabled: false,
        type: 'success',
        content: ''
      }
    };
  }

  isReservable() {
    const { max_reservations } = this.props.item;
    return max_reservations > 0;
  }

  loading(loading) {
    this.setState({ loading });
  }

  openReservationForm() {
    const { wishlist, item } = this.props;
    const { id } = item;

    this.loading(true);
    wishlist.get_reservations(id, (err, count) => {
      if (err) {
        throw err;
      }

      this.setState({
        reservationCount: count,
        showReservationForm: true,
        loading: false
      });
    });
  }

  closeReservationForm() {
    this.setState({
      showReservationForm: false
    });
  }

  handleReservationAction(strategy, count) {
    const { id, name } = this.props.item;

    this.closeReservationForm();
    this.loading(true);
    strategy.send(id, count, err => {
      if (err) {
        this.alertDanger(`Något gick fel: ${err.message}`);
      }
      else {
        const { verbPassed } = strategy;
        this.alertSuccess(`Du ${verbPassed} ${count} stycken ${name}`);
      }
      this.loading(false);
    });
  }

  closeAlert() {
    this.setState({
      alert: {
        enabled: false
      }
    });
  }

  alertSuccess(message) {
    this.setState({
      alert: {
        enabled: true,
        type: 'success',
        content: message
      }
    });
  }

  alertDanger(message) {
    this.setState({
      alert: {
        enabled: true,
        type: 'danger',
        content: message
      }
    });
  }

  image() {
    const { item } = this.props;

    return (
      <div className="thumbnail">
        <img src={item.image} />
      </div>
    );
  }

  links() {
    const { links } = this.props.item;

    return (
      <div className="item-links">
        {links.map((link, index) =>
          <a
            key={index}
            href={`http://${link.href}`}
            target="_blank"
            className="label label-default"
          >
            {link.title.toUpperCase()}
          </a>
        )}
      </div>
    );
  }

  reserveButton() {
    if (this.isReservable()) {
      const { loading } = this.state;

      return (
        <Button
          onClick={() => this.openReservationForm()}
          loading={loading}
        >
          Reservera
        </Button>
      );
    }

    return null;
  }

  description() {
    const { name, description } = this.props.item;

    return (
      <div className="item-description">
        <h2>
          <span>{name}</span>
          {this.reserveButton()}
        </h2>
        <p>{description}</p>
        {this.links()}
      </div>
    );
  }

  reservationForm() {
    const { item, wishlist } = this.props;
    const { reservationCount } = this.state;

    return (
      <ReservationForm
        item={item}
        wishlist={wishlist}
        reserved={reservationCount}
        onCancel={() => this.closeReservationForm()}
        onOK={
          (strategy, count) => this.handleReservationAction(strategy, count)
        }
      />
    );
  }

  render() {
    const { smallScreen } = this.props;
    const { showReservationForm, alert } = this.state;
    const imgWidth = smallScreen ? '3' : '2';
    const descriptionWidth = smallScreen ? '9' : '10';
    const content = showReservationForm ?
                    this.reservationForm() :
                    this.description();
    return (
      <div className="wishlist-item">
        <div className="row">
          <div className={`col-xs-${imgWidth}`}>
            {this.image()}
          </div>
          <div className={`col-xs-${descriptionWidth}`}>
            <Alert
              enabled={alert.enabled}
              type={alert.type}
              onClose={() => this.closeAlert()}
            >
              {alert.content}
            </Alert>
            {content}
          </div>
        </div>
      </div>
    );
  }
}
