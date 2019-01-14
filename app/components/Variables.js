// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Variables.css';
import { ThemeContext } from '../utils/theme-context';
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';

import Input from './InputText';
import Select from './Select';

import { getChildByID, addChildToTree } from '../utils/helpers';

import {
  MdAdd,
  MdEdit,
  MdClose,
  MdAddCircle,
  MdKeyboardArrowUp
} from 'react-icons/md';

type Props = {};

class NewVariable extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      name: '',
      searchType: '',
      numOrStr: '',
      searchBool: ''
    };
  }

  updateName = e => {
    this.setState({ name: e.target.value });
  };

  selectType = type => {
    this.setState({ searchType: type });
  };

  selectBool = type => {
    this.setState({ searchBool: type });
  };

  updateSearchType = e => {
    this.setState({ searchType: e.target.value });
  };

  updateSearchBool = e => {
    this.setState({ searchBool: e.target.value });
  };

  updateNumOrStr = e => {
    this.setState({ numOrStr: e.target.value });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  newError = err => {
    this.setState({ error: err });
    setTimeout(() => {
      this.setState({ error: null });
    }, 5000);
  };

  validateForSumbit = () => {
    // Takes in the state of the object and validates all information
    if (this.state.name.length === 0) {
      this.newError('Please enter a name!');
      return false;
    }

    if (
      this.state.searchType.toLowerCase() !== 'number' &&
      this.state.searchType.toLowerCase() !== 'string' &&
      this.state.searchType.toLowerCase() !== 'object' &&
      this.state.searchType.toLowerCase() !== 'boolean'
    ) {
      this.newError('Invalid Type!');
      return false;
    }

    switch (this.state.searchType.toLowerCase()) {
      case 'number':
        if (isNaN(parseFloat(this.state.numOrStr))) {
          this.newError('Invalid Number');
          return false;
        }
        break;
      case 'string':
        if (this.state.numOrStr.length > 1024) {
          this.newError('String too long, max length 1024');
          return false;
        }
        break;
      case 'object':
        break;
      case 'boolean':
        if (this.state.searchBool !== 'ON' && this.state.searchBool !== 'OFF') {
          this.newError('Invalid Boolean');
          return false;
        }
        break;
    }
    return true;
  };

  render() {
    let theme = this.context;
    let { props, state } = this;
    return (
      <div
        className={styles.createVariable}
        style={{
          backgroundColor: theme.secondary,
          color: theme.secondaryText
        }}
      >
        {this.state.error ? (
          <div
            className={styles.error}
            style={{ backgroundColor: theme.error, color: theme.errorText }}
          >
            {this.state.error}
          </div>
        ) : null}
        <div>
          <div className={styles.head}>NEW VARIABLE</div>
          <Input
            title="Variable Name"
            placeholder="Enter a name..."
            search={this.state.name}
            onChange={this.updateName}
          />
          <Select
            children={{ number: {}, string: {}, object: {}, boolean: {} }}
            select={this.selectType}
            search={this.state.searchType}
            updateSearch={this.updateSearchType}
            title="Select Type"
          />
          {this.state.searchType.toLowerCase() === 'number' ||
          this.state.searchType.toLowerCase() === 'string' ? (
            <Input
              title="Default Value"
              placeholder="Enter a value..."
              search={this.state.numOrStr}
              onChange={this.updateNumOrStr}
            />
          ) : this.state.searchType.toLowerCase() === 'boolean' ? (
            <Select
              select={this.selectBool}
              search={this.state.searchBool}
              updateSearch={this.updateSearchBool}
              title={'Default Value'}
              children={{ on: {}, off: {} }}
            />
          ) : null}
        </div>
        <div
          className={styles.footer}
          style={{
            backgroundColor: theme.secondaryText,
            color: theme.secondary,
            marginTop:
              this.state.searchType.toLowerCase() === 'number' ||
              this.state.searchType.toLowerCase() === 'string'
                ? '20px'
                : '0px'
          }}
          onClick={() => {
            if (this.validateForSumbit()) {
              props.addVariable(Object.assign({}, this.state));
            }
          }}
        >
          CREATE
        </div>
      </div>
    );
  }
}

NewVariable.contextType = ThemeContext;

class Variables extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      opened: false,
      search: '',
      error: null,
      name: ''
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

  select = val => {
    this.setState({ search: val });
  };

  hasValidSelected = () => {
    if (!this.state.search) return false;
    return !!this.props.children[this.state.search.toLowerCase()];
  };

  clearError = () => {
    this.setState({ error: null });
  };

  newError = err => {
    this.setState({ error: err });
    setTimeout(() => {
      this.setState({ error: null });
    }, 5000);
  };

  addVariable = state => {
    console.log(state, 'new variable');
  };

  overlay = theme => {
    this.props.makeOverlay(<NewVariable addVariable={this.addVariable} />);
  };

  render() {
    let theme = this.context;
    let { state, props } = this;
    let { children } = props;
    return (
      <div
        className={
          styles.dropdown +
          ' ' +
          (state.opened ? styles.opened : '') +
          ' ' +
          (props.title ? styles.headerMargin : '')
        }
        style={{
          backgroundColor: theme.secondaryOff,
          color: theme.secondaryText
        }}
      >
        {props.title ? (
          <div className={styles.header}>{props.title}</div>
        ) : null}
        <div
          className={
            styles.dropdown_title + ' ' + (state.opened ? styles.titleOpen : '')
          }
        >
          <input
            className={styles.input}
            placeholder={props.placeholder || 'Search...'}
            value={props.search}
            onChange={props.updateSearch}
            type={'text'}
            onClick={() => {
              this.open();
            }}
          />
          <MdKeyboardArrowUp
            size="32px"
            className={
              styles.animated + ' ' + (state.opened ? styles.rotate : '')
            }
            onClick={() => {
              this.toggle();
            }}
          />
          <div
            className={
              styles.ulwrap + ' ' + (state.opened ? styles.visible : '')
            }
          >
            <ul
              className={
                styles.list + ' ' + (state.opened ? styles.visible : '')
              }
              style={{ display: this.state.opened ? 'block' : 'none' }}
            >
              <li
                onClick={() => {
                  this.overlay(theme);
                }}
                className={styles.addNew}
                style={{
                  fontWeight: 'bold'
                }}
              >
                ADD NEW
              </li>
              {this.props.liMap ||
                Object.keys(children).map(name => {
                  if (
                    this.props.search.length > 0 &&
                    !name.includes(this.props.search.toLowerCase())
                  ) {
                    return null;
                  }
                  // This returned LI will change based on the type of object
                  /**
                   * {
                   *  style: {
                   *  backgroundColor: "#343434"
                   * }
                   */
                  return (
                    <li
                      onClick={() => {
                        props.select(name.toUpperCase());
                        this.close();
                      }}
                    >
                      {name.toUpperCase()}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Variables.PropTypes = {
  children: PropTypes.Object,
  select: PropTypes.String,
  search: PropTypes.String,
  updateSearch: PropTypes.Function,
  path: PropTypes.String,
  newError: PropTypes.Function,
  clearError: PropTypes.Function,
  title: PropTypes.String
};

Variables.contextType = ThemeContext;

export default Variables;
