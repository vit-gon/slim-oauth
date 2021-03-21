import React from 'react';
import Link from "next/link";
import { Nav, Navbar, Form, Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './Default.module.scss';

class DefaultLayout extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      let target = e.target as HTMLElement;
      if (!target.classList.contains('main-navbar') && !target.closest('.main-navbar')) {
        this.setState({ navExpanded: false });
      }
    })
  }

  setNavExpanded = (expanded) => {
    this.setState({ navExpanded: expanded });
  }

  closeNav = () => {
    this.setState({ navExpanded: false });
  }

  logout = () => {

  }

  render() {
    return (
      <>
        <Navbar
          className="main-navbar"
          bg="dark"
          expand="lg"
          variant="dark"
          onToggle={this.setNavExpanded}
          expanded={this.state.navExpanded}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/">
                <a className="nav-link" onClick={this.closeNav}>Home</a>
              </Link>
            </Nav>

            <Nav>
              {!this.props.user && (
                  <Link href="/login">
                    <a className="nav-link" onClick={this.closeNav}>Login</a>
                  </Link>
              )}

              <DropdownButton
                  menuAlign="right"
                  title={this.props.user?.name}
                  id="dropdown-menu-align-right"
              >
                <Link href="/profile" >
                  <a className="dropdown-item" onClick={this.closeNav}>Profile</a>
                </Link>
                <Dropdown.Item eventKey="2" onClick={this.logout}>Logout</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Row className={styles.wrap}>
            <Col>{this.props.children}</Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default DefaultLayout;
