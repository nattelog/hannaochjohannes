import React from 'react';
import Section from './Section';
import './WishlistSection.css';
import Wishlist from '../wishlist';
import WishlistItem from './WishlistItem';

export default class WishlistSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      items: [],
      smallScreen: false
    };
    this.wishlist = Wishlist(
      () => this.connect(),
      err => this.connectError(err)
    );
  }

  setSmallScreen() {
    const smallScreen = window.innerWidth < 768;
    this.setState({ smallScreen });
  }

  componentDidMount() {
    this.setSmallScreen();

    window.addEventListener('resize', () =>
      this.setSmallScreen()
    );
  }

  connect() {
    this.setState({
      connected: true
    });
    this.getItems();
  }

  connectError(err) {
    console.error(err);
    this.setState({
      connected: false
    });
  }

  getItems() {
    this.wishlist.get_items((err, items) => {
      if (err) {
        throw err;
      }
      this.setState({
        items: items
      });
    });
  }

  render() {
    const { el } = this.props;
    const { connected, items, smallScreen } = this.state;
    const loadingText = connected ? '' : ' (laddar...)';

    return (
      <Section customClassName="wishlist-section" el={el}>
        <h1>{'Önskelista' + loadingText}</h1>
        {items.map(item =>
          <WishlistItem
            key={item.id}
            item={item}
            wishlist={this.wishlist}
            smallScreen={smallScreen}
          />
         )
        }
      </Section>
    );
  }
}
