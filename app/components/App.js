// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './App.css';
import { ThemeContext } from '../utils/theme-context';
import Elements from '../siteComponents';

import uuidv4 from 'uuid/v4';

Object.keys(Elements).map(key => {
  Elements[key] = Elements[key].options;
});

import {
  MdAdd,
  MdEdit,
  MdClose,
  MdAddCircle,
  MdKeyboardArrowUp
} from 'react-icons/md';
import { stripLeadingSlash } from 'history/PathUtils';

type Props = {};

class Scratch extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.content;
    if (!content.children) content.children = {};
    return (
      <div className={styles.wrapper} style={this.props.style}>
        <div className={styles.title}>TEST</div>
        <div className={styles.add}>
          <MdAddCircle
            size="24px"
            onClick={() => {
              let id = this.props.parent ? this.props.parent : '/';
              this.props.addComponent(id);
            }}
          />
        </div>
        {Object.keys(content.children).map(key => {
          let child = content.children[key];
          let id = this.props.parent ? `${this.props.parent}/${key}` : key;
          return (
            <Scratch
              content={child}
              style={{ backgroundColor: 'blue' }}
              addComponent={this.props.addComponent}
              parent={id}
            />
          );
        })}
      </div>
    );
  }
}

class Select extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      opened: false,
      search: ''
    };
  }

  open = () => {
    this.setState({ opened: true });
  };

  close = () => {
    this.setState({ opened: false });
  };

  toggle = () => {
    this.setState({ opened: !this.state.opened });
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    let theme = this.context;
    let state = this.state;
    return (
      <div
        className={styles.Select}
        style={{ backgroundColor: theme.secondary }}
      >
        <div
          className={
            styles.dropdown + ' ' + (state.opened ? styles.opened : '')
          }
          style={{
            backgroundColor: theme.secondaryOff,
            color: theme.secondaryText
          }}
        >
          <div
            className={styles.dropdown_title}
            onClick={() => {
              this.toggle();
            }}
          >
            <input
              className={styles.input}
              placeholder={'Search...'}
              value={this.state.search}
              onChange={this.updateSearch}
              type={'text'}
            />
            <MdKeyboardArrowUp
              size="32px"
              className={
                styles.animated + ' ' + (state.opened ? styles.rotate : '')
              }
            />
            <ul
              className={
                styles.list + ' ' + (state.opened ? styles.visible : '')
              }
              style={{ display: this.state.opened ? 'block' : 'none' }}
            >
              <li>TEST</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Select.contextType = ThemeContext;

class App extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let children = {};
    children[uuidv4()] = {
      componentName: 'app',
      children: {}
    };
    this.state = {
      content: {
        componentName: 'app',
        children
      }
    };
  }

  addComponent = id => {
    // let content = Object.assign({}, this.state.content);
    // let newId = uuidv4();
    // if (!id || id === '/') {
    //   // This is the parent
    //   content.children[newId] = {
    //     componentName: 'app',
    //     children: {}
    //   };
    // } else {
    //   let path = id.split('/');
    //   let contentPath = content;
    //   for (let x = 0; x < path.length; x++) {
    //     if (!contentPath.children[path[x]]) {
    //       console.log(contentPath, path[x], path);
    //       return alert('BEEP BOOP! ERROR!');
    //     }
    //     contentPath = contentPath.children[path[x]];
    //   }
    //   contentPath.children[newId] = {
    //     componentName: 'app',
    //     children: {}
    //   };
    // }
    // this.setState({ content });
    let props = this.props;
    let { updateOverlay, closeOverlay } = props;

    updateOverlay(<Select />);
  };

  render() {
    let theme = this.context;
    let props = this.props;
    return (
      <div className={styles.app}>
        <Scratch
          content={this.state.content}
          style={{ backgroundColor: 'red' }}
          addComponent={this.addComponent}
        />
      </div>
    );
  }
}

App.contextType = ThemeContext;

export default App;
