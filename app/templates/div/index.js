// imports is an array of strings

export function generateComponent(obj = {}) {
  let { content = '', imports = [], hasChildren = true } = obj;
  imports.join('\n');
  return `
import React, { Component } from 'react';
import Styles from './index.css'
${imports}

export let options = require('./options');

export default class Main extends Component<Props> {
  props: Props;
    
  constructor(props) {
    super(props)
  }
    
  render() {
    return <div>${hasChildren ? content : null}</div>;
  }
}`;
}

export function generateCss(obj = {}) {
  let { css = '' } = obj;
  return `${css}`;
}

export function generateOptions(obj = {}) {
  let { options } = obj;
  options = Object.assign(
    {
      default: false,
      locked: false,
      description: '',
      meta: { backgroundColor: '#b4b4b4' },
      componentName: 'placeholder',
      hasChildren
    },
    options
  );
  let str = `module.exports = ${JSON.stringify(options)};
  `.toString('utf8');
  return str;
}

export let options = require('./options');
