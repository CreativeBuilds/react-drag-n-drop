// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Form.css';
import { ThemeContext } from '../utils/theme-context';

import uuidv4 from 'uuid/v4';

import { getChildByID, addChildToTree } from '../utils/helpers';

import Select from './Select';
import Submit from './Submit';

import {
  MdAdd,
  MdEdit,
  MdClose,
  MdAddCircle,
  MdKeyboardArrowUp
} from 'react-icons/md';

type Props = {};

class Form extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      search: '',
      error: null
    };
    this.submit = () => {
      this.props.submit(this.state.search, props.path);
    };
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  select = val => {
    console.log('SELECTED', val);
    this.setState({ search: val });
  };

  hasValidSelected = () => {
    if (!this.state.search) return false;
    return !!this.props.childrenElements[this.state.search.toLowerCase()];
  };

  clearError = () => {
    this.setState({ error: null });
  };

  newError = err => {
    console.log('New error', err);
    this.setState({ error: err });
    setTimeout(() => {
      this.setState({ error: null });
    }, 5000);
  };

  render() {
    let theme = this.context;
    let { state, props } = this;
    let { childrenElements } = props;
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
        <Select
          children={childrenElements}
          submit={this.submit}
          select={this.select}
          search={this.state.search}
          updateSearch={this.updateSearch}
          path={props.id}
          newError={this.newError}
          clearError={this.clearError}
        />
        <Submit
          hasValidSelected={this.hasValidSelected}
          submit={this.submit}
          close={props.close}
          newError={this.newError}
          clearError={this.clearError}
        />
      </div>
    );
  }
}

Form.contextType = ThemeContext;

export default Form;