/**
 * default: true
 * componentName: background
 * description: This is the background of the site
 * varirables: {
 *  backgroundColor: "#333333"
 * }
 */

import React, { Component } from 'react';
import Styles from './app.css';

export default class Main extends Component<Props> {
  props: Props;

  render() {
    return <div className={Styles.app}>{props.children}</div>;
  }
}

export let options = require('./options');
