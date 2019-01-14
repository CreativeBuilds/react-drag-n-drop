// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Overlay.css';

import Menu from './Menu';
import { ThemeContext } from '../utils/theme-context';

type Props = {};

class Overlay extends Component<Props> {
  props: Props;

  render() {
    let { theme, props } = this;
    let { component, secondaryComponent } = props;
    if (!props.component || props.component === null) return null;
    return (
      <div className={styles.overlay} data-tid="overlay">
        <div
          className={styles.overlay_click}
          onClick={() => {
            this.props.onClick();
          }}
        />
        <div
          style={
            secondaryComponent
              ? { display: 'none', zIndex: '104' }
              : { zIndex: '104' }
          }
        >
          {props.component}
        </div>
        {props.secondaryComponent || null}
      </div>
    );
  }
}

Overlay.contextType = ThemeContext;

export default Overlay;
