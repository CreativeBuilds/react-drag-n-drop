// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './MainWrapper.css';

import fs from 'fs';
import validFilename from 'valid-filename';

import Menu from './Menu';
import Overlay from './Overlay';
import App from './App';
import { ThemeContext } from '../utils/theme-context';

import path from 'path';
import Elements from '../siteComponents';
let ScratchElements = {};

Object.keys(Elements).map(key => {
  ScratchElements[key] = Elements[key].options;
  console.log('SCRATCH', ScratchElements);
});

type Props = {};

class MainWrapper extends Component<Props> {
  props: Props;
  // This element needs to know all possible elements
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      components: ScratchElements
    };
  }

  componentDidMount() {
    console.log(require('../siteComponents'), 'TEST!');
  }

  updateOverlay = component => {
    this.setState({ component });
  };

  closeOverlay = () => {
    this.setState({ component: null });
  };

  makeNewComponent = (opts = {}) => {
    let { name = 'john' } = opts;
    if (!validFilename(name)) return;

    // Blame FS for this shit \/
    fs.mkdir(
      __dirname + `/siteComponents/${name}`,
      { recursive: true },
      err => {
        if (err) throw err;
        fs.writeFile(
          __dirname + `/siteComponents/${name}` + '/options.js',
          require('../templates/div').generateOptions({
            options: { componentName: name }
          }),
          err => {
            if (err) throw err;
          }
        );
        fs.writeFile(
          __dirname + `/siteComponents/${name}` + '/app.js',
          require('../templates/div').generateComponent(),
          err => {
            if (err) throw err;
          }
        );
        fs.writeFile(
          __dirname + `/siteComponents/${name}` + '/index.css',
          require('../templates/div').generateCss(),
          err => {
            if (err) throw err;
          }
        );
      }
    );
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
          ScratchElements={ScratchElements}
          makeNewComponent={this.makeNewComponent}
        />
        <App
          updateOverlay={this.updateOverlay}
          closeOverlay={this.closeOverlay}
        />
        <Overlay component={this.state.component} onClick={this.closeOverlay} />
      </div>
    );
  }
}

MainWrapper.contextType = ThemeContext;

export default MainWrapper;
