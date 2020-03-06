import React, {Component} from 'react';
import './Drawer.sass';
import classNames from 'classnames';
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink } from 'react-router-dom';

class Drawer extends Component {



  renderLinks = (links) => {
    return links.map((link, index) => {
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
    const { isOpen, handleBackDrop, isLogin } = this.props;
    let links = [
      {
        to: '/',
        label: 'Список',
        exact: true
      }
    ];

    links = isLogin
      ? [...links,
          {to: '/quiz-creator', label: 'Создать тест', exact: false},
          {to: '/logout', label: 'Выйти', exact: false}
        ]
      : [...links, {to: '/auth', label: 'Авторизация', exact: false}]

    return (
      <>
        <nav className={classNames({
          'Drawer': true,
          'Drawer--Close': !isOpen
        })}>
          <ul className="Drawer__List">
            { this.renderLinks(links) }
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
