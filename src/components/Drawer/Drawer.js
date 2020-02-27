import React, {Component} from 'react';
import './Drawer.sass';
import classNames from 'classnames';
import Backdrop from "../UI/Backdrop/Backdrop";

class Drawer extends Component {

  links = [1,2,3];

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
