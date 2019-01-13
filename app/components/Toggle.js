// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Toggle.css';
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

  render() {
    let theme = this.context;
    let { state, props } = this;
    return (
      <div
        className={
          styles.dropdown + ' ' + (props.title ? styles.headerMargin : '')
        }
        style={{
          backgroundColor: theme.secondaryOff,
          color: theme.secondaryText
        }}
        onClick={() => {
          props.onClick();
        }}
      >
        <div
          className={
            styles.dropdown_title + ' ' + (state.opened ? styles.titleOpen : '')
          }
        >
          {props.title ? (
            <div className={styles.header}>{props.title}</div>
          ) : null}
          <div
            className={styles.toggleWrapper}
            style={{
              border: `2px solid ${theme.secondaryText}`,
              color: theme.secondaryText
            }}
          >
            {props.value ? <MdClose size="32px" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

Select.PropTypes = {
  value: PropTypes.Boolean,
  toggle: PropTypes.Function,
  title: PropTypes.String
};
Select.contextType = ThemeContext;

export default Select;
