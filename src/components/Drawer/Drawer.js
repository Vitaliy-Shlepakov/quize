import React, {Component} from 'react';
import './Drawer.sass';
import classNames from 'classnames';

class Drawer extends Component {

  links = [1,2,3]

  renderLinks = () => {
    return this.links.map((link, index) => {
      return (
        <li key={index} className="Drawer__Item">
          <a href="#" className="Drawer__Link">{link}</a>
        </li>
      )
    })
  };

  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <nav className={classNames({
          'Drawer': true,
          'Drawer--Close': !isOpen
        })}>
          <ul className="Drawer__List">
            { this.renderLinks() }
          </ul>
        </nav>
      </div>
    );
  }
}

export default Drawer;
