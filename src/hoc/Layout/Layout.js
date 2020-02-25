import React, {Component} from 'react';
import './Layout.sass';

class Layout extends Component {
  render() {
    return (
      <div>
        <main className="Layout__Main">
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default Layout;
