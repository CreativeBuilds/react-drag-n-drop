/**
 * default: true
 * componentName: background
 * description: This is the background of the site
 * varirables: {
 *  backgroundColor: "#333333"
 * }
 */

import React, { Component } from 'react';

export default class Main extends Component<Props> {
  render() {
    return <div>Hello World!</div>;
  }
}

export let options = require('./options');
