import React, {Component} from 'react';
import './Layout.sass';
import MenuToggle from "../../components/MenuToggle/MenuToggle";
import Drawer from "../../components/Drawer/Drawer";

class Layout extends Component {

  state = {
    isMenuOpen: false
  };

  handlerToggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      }
    })
  };

  handleBackDrop = () => {
    this.setState({isMenuOpen: false})
  };

  render() {
    const {isMenuOpen} = this.state;

    return (
      <div className="Layout">
        <Drawer
          isOpen={isMenuOpen}
          handleBackDrop={this.handleBackDrop}
        />
        <MenuToggle
          onToggle={this.handlerToggleMenu}
          isOpen={isMenuOpen}
        />
        <main className="Layout__Main">
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default Layout;
