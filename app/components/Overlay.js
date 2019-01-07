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
    if (!props.component || props.component === null) return null;
    console.log('Should render component!');
    return (
      <div className={styles.overlay} data-tid="overlay">
        {props.component}
      </div>
    );
  }
}

Overlay.contextType = ThemeContext;

export default Overlay;
