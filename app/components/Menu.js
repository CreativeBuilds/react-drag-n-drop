// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Menu.css';
import { ThemeContext } from '../utils/theme-context';
import MainWrapper from './MainWrapper';

import MenuElements from './MenuElements';

type Props = {};

const MenuItem = props => {
  return (
    <li
      style={{
        color: props.theme.secondaryText,
        backgroundColor: props.theme.secondary
      }}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </li>
  );
};

const MenuHome = props => {
  return (
    <ul>
      <MenuItem
        theme={props.theme}
        onClick={() => {
          props.changePage(1);
        }}
      >
        ELEMENTS
      </MenuItem>
      {/* <MenuItem
        theme={props.theme}
        onClick={() => {
          props.changePage(2);
        }}
      >
        GLOBAL VARS
      </MenuItem> */}
    </ul>
  );
};

class Menu extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    /**
     * 0 is home
     * 1 is components
     * 2 is variables
     */
    this.state = {
      page: 0
    };
  }

  changePage = page => {
    if (page < 0 || page > 2) return;
    this.setState({ page });
  };

  render() {
    let theme = this.context;
    let props = this.props;
    return (
      <div
        className={styles.container}
        data-tid="container"
        style={{ backgroundColor: theme.main }}
      >
        <h2>MENU</h2>
        {this.state.page == 0 ? (
          <MenuHome changePage={this.changePage} theme={theme} />
        ) : null}
        {this.state.page == 1 ? (
          <MenuElements
            changePage={this.changePage}
            theme={theme}
            updateOverlay={props.updateOverlay}
            closeOverlay={props.closeOverlay}
            Elements={props.ScratchElements}
            makeNewComponent={props.makeNewComponent}
          />
        ) : null}
        {this.state.page == 2 ? (
          <MenuVariables changePage={this.changePage} theme={theme} />
        ) : null}
      </div>
    );
  }
}

Menu.contextType = ThemeContext;

export default Menu;
