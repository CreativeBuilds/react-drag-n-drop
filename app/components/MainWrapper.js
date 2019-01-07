// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './MainWrapper.css';

import Menu from './Menu';
import Overlay from './Overlay';
import { ThemeContext } from '../utils/theme-context';

type Props = {};

class MainWrapper extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      component: null
    };
  }

  updateOverlay = component => {
    this.setState({ component });
  };

  closeOverlay = () => {
    this.setState({ component: null });
  };

  render() {
    let theme = this.context;
    return (
      <div
        className={styles.container}
        data-tid="container"
        style={{ backgroundColor: theme.secondary }}
      >
        <Menu
          updateOverlay={this.updateOverlay}
          closeOverlay={this.closeOverlay}
        />
        {/* <App></App> */}
        <Overlay component={this.state.component} />
      </div>
    );
  }
}

MainWrapper.contextType = ThemeContext;

export default MainWrapper;
