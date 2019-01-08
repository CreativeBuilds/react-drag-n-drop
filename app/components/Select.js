// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Select.css';
import { ThemeContext } from '../utils/theme-context';

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
        className={styles.Select}
        style={{ backgroundColor: theme.secondary }}
      >
        {this.state.error ? (
          <div
            className={styles.error}
            style={{ backgroundColor: theme.error, color: theme.errorText }}
          >
            {this.state.error}
            <MdClose
              className={styles.error_close}
              size="24px"
              onClick={() => {
                this.clearError();
              }}
            />
          </div>
        ) : null}
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
            className={
              styles.dropdown_title +
              ' ' +
              (state.opened ? styles.titleOpen : '')
            }
          >
            <input
              className={styles.input}
              placeholder={'Search...'}
              value={this.state.search}
              onChange={this.updateSearch}
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
                {Object.keys(children).map(name => {
                  if (children[name].generated) return null;
                  return (
                    <li
                      onClick={() => {
                        this.select(name.toUpperCase());
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
        <div
          className={styles.submit}
          onClick={() => {
            if (this.hasValidSelected()) {
              props.submit(this.state.search, props.path);
              props.close();
            } else {
              this.newError('No valid element selected!');
            }
          }}
          style={{
            backgroundColor: theme.secondaryText,
            color: theme.secondary
          }}
        >
          SUBMIT
        </div>
      </div>
    );
  }
}

Select.contextType = ThemeContext;

export default Select;
