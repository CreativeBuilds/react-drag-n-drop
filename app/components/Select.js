// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Select.css';
import { ThemeContext } from '../utils/theme-context';
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';

import { getChildByID, addChildToTree } from '../utils/helpers';

import {
  MdAdd,
  MdEdit,
  MdClose,
  MdAddCircle,
  MdKeyboardArrowUp
} from 'react-icons/md';

type Props = {};

class Select extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      opened: false,
      search: '',
      error: null
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
    if (!this.state.opened) {
      return this.setState({ opened: true, search: e.target.value });
    }
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
              {this.props.liMap ||
                Object.keys(children).map(name => {
                  if (
                    this.props.search.length > 0 &&
                    !name.includes(this.props.search.toLowerCase())
                  ) {
                    return null;
                  }

                  if (children[name].generated) return null;
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

Select.PropTypes = {
  children: PropTypes.Object,
  select: PropTypes.String,
  search: PropTypes.String,
  updateSearch: PropTypes.Function,
  path: PropTypes.String,
  newError: PropTypes.Function,
  clearError: PropTypes.Function,
  title: PropTypes.String
};
Select.contextType = ThemeContext;

export default Select;
