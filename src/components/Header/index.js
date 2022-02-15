import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Dropdown, Icon, Header } from 'rsuite';
import * as AuthenticationService from '../../services/authenticationService'

function handleClickLogout(e){
  AuthenticationService.logout();
}

function MyHeader () {
  return (
    <Header>
      <Navbar appearance="inverse">
        <Navbar.Header>
          <a className="navbar-brand logo"></a>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
            <Nav.Item>News</Nav.Item>
            <Nav.Item>Products</Nav.Item>
            <Dropdown title="About">
              <Dropdown.Item>Company</Dropdown.Item>
              <Dropdown.Item>Team</Dropdown.Item>
              <Dropdown.Item>Contact</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            <Nav.Item onClick={handleClickLogout}>Logout</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </Header>
  );
}

export default MyHeader;