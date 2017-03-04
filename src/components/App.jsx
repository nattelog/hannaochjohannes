import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import '../../public/fonts/fonts.css';
import Navbar from './Navbar';
import Section from './Section';
import ScrollLink from './ScrollLink';
import InvitationCardSection from './InvitationCardSection';
import StorySection from './StorySection';
import ImageDividerSection from './ImageDividerSection';
import WishlistSection from './WishlistSection';
import MapSection from './MapSection';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      activeSection: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', e => this.onScroll(e));

    this.setState({
      sections: [
        this.story,
        this.wishList,
        this.map
      ]
    });
  }

  getSectionIndex(position) {
    const { sections } = this.state;
    let foundIndex = 0;

    sections.find((section, index) => {
      const { height } = section.getBoundingClientRect();
      const top = section.offsetTop - 90;
      const bottom = top + height;

      if (position >= top && position < bottom) {
        foundIndex = index;
        return true;
      }

      return false;
    });

    return foundIndex;
  }

  onScroll(e) {
    const position = e.target.documentElement.scrollTop || window.pageYOffset;
    const index = this.getSectionIndex(position);

    this.setState({
      activeSection: index
    });
  }

  render() {
    const { sections, activeSection } = this.state;
    const navItems = [
      <ScrollLink target={sections[0]}>VÅR STORY</ScrollLink>,
      <ScrollLink target={sections[1]}>ÖNSKELISTA</ScrollLink>,
      <ScrollLink target={sections[2]}>KARTA</ScrollLink>
    ];

    return (
      <div>
        <Navbar items={navItems} activeSection={activeSection} />
        <InvitationCardSection />
        <StorySection el={r => { this.story = r; }} />
        <ImageDividerSection />
        <WishlistSection el={r => { this.wishList = r; }} />
        <MapSection el={r => { this.map = r; }} />
      </div>
    );
  }
}
