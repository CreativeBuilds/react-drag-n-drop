// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Submit.css';
import { ThemeContext } from '../utils/theme-context';
import PropTypes from 'prop-types';

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

  render() {
    let theme = this.context;
    let { state, props } = this;
    let { children } = props;
    return (
      <div
        className={styles.submit}
        onClick={() => {
          console.log('1');
          if (props.hasValidSelected()) {
            props.submit();
            props.close();
          } else {
            props.newError('No valid element selected!');
          }
        }}
        style={{
          backgroundColor: theme.secondaryText,
          color: theme.secondary
        }}
      >
        SUBMIT
      </div>
    );
  }
}

Select.contextType = ThemeContext;

export default Select;
