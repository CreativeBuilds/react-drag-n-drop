// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Select.css';
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

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  select = val => {
    this.setState({ search: val });
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
          <div className={styles.dropdown_title}>
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
          </div>
        </div>
        {/* <div
          className={styles.submit}
          onClick={() => {
            if (this.hasValidSelected()) {
              props.submit(this.state.search);
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
        </div> */}
      </div>
    );
  }
}

InputText.contextType = ThemeContext;

export default InputText;
