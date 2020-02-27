import React, {Component} from 'react';
import './Drawer.sass';
import classNames from 'classnames';
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink } from 'react-router-dom';

class Drawer extends Component {

  links = [
    {
      to: '/',
      label: 'Список',
      exact: true
    },
    {
      to: '/auth',
      label: 'Авторизация',
      exact: true
    },
    {
      to: '/quiz-creator',
      label: 'Создать тест',
      exact: true
    },
  ];

  renderLinks = () => {
    return this.links.map((link, index) => {
      return (
        <li key={index} className="Drawer__Item">
          <NavLink
            to={link.to}
            exact={link.exact}
            onClick={this.props.handleBackDrop}
          >
            { link.label}
          </NavLink>
        </li>
      )
    })
  };

  render() {
    const { isOpen, handleBackDrop } = this.props;
    return (
      <>
        <nav className={classNames({
          'Drawer': true,
          'Drawer--Close': !isOpen
        })}>
          <ul className="Drawer__List">
            { this.renderLinks() }
          </ul>
        </nav>
        {
          isOpen &&  <Backdrop
            onClick={handleBackDrop}
          />
        }
      </>
    );
  }
}

export default Drawer;
