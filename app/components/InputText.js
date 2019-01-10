// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './InputText.css';
import { ThemeContext } from '../utils/theme-context';

// import uuidv4 from 'uuid/v4';

// import { getChildByID, addChildToTree } from '../utils/helpers';

import { MdClose, MdKeyboardArrowUp } from 'react-icons/md';

type Props = {};

class InputText extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      search: '',
      error: null
    };
  }

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
          styles.input_title + ' ' + (props.title ? styles.headerMargin : '')
        }
      >
        {props.title ? (
          <div className={styles.header}>{props.title}</div>
        ) : null}
        <input
          className={styles.input}
          placeholder={props.placeholder || 'Search...'}
          value={props.search}
          onChange={props.onChange}
          type={'text'}
          style={{
            backgroundColor: theme.secondaryOff,
            color: theme.secondaryText
          }}
        />
      </div>
    );
  }
}

InputText.contextType = ThemeContext;

export default InputText;
