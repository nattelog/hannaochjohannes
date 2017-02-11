import React from 'react';
import './Navbar.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
const { Header, Toggle, Collapse } = Navbar;

export default class AbstractNavbar extends React.Component {
  render() {
    const { items, activeSection } = this.props;

    return (
      <Navbar collapseOnSelect fixedTop>
        <Header>
          <Toggle />
        </Header>
        <Collapse>
          <Nav activeKey={activeSection}>
            {items.map((item, index) =>
              <NavItem
                key={index}
                eventKey={index}
              >
                {item}
              </NavItem>
             )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
