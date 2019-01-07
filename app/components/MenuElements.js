// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './MenuElements.css';
import { ThemeContext } from '../utils/theme-context';
import Elements from '../siteComponents';

Object.keys(Elements).map(key => {
  Elements[key] = Elements[key].options;
});

import { MdAdd, MdEdit, MdClose } from 'react-icons/md';

type Props = {};

class CreateElement extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      componentName: '',
      default: false,
      description: '',
      variables: {},
      error: null
    };
  }

  updateComponentName = e => {
    this.setState({ componentName: e.target.value });
  };
  updateDescription = e => {
    this.setState({ description: e.target.value });
  };
  clearError = () => {
    this.setState({ error: null });
  };
  newError = error => {
    this.setState({ error });
    setTimeout(() => {
      this.clearError();
    }, 5000);
  };
  addComponent = () => {
    let name = this.state.componentName.toLowerCase();
    // TODO replace return with an error
    if (Elements[name]) {
      this.newError('Component with that name already exists!');
      return;
    }
    let obj = Object.assign({}, this.state);
    delete obj.error;
    Elements[name] = obj;
    this.props.closeOverlay();
  };

  render() {
    let theme = this.context;
    let props = this.props;
    return (
      <div
        className={styles.createElement}
        style={{
          backgroundColor: theme.secondary,
          color: theme.secondaryText
        }}
      >
        {this.state.error ? (
          <div className={styles.error}>{this.state.error}</div>
        ) : null}
        <div>
          <br />
          <br />
          <br />
          Component Name:{' '}
          <input
            type="text"
            name="componentName"
            onChange={this.updateComponentName}
            value={this.state.componentName}
          />
          <br />
          <br />
          Description:{' '}
          <input
            type="text"
            name="description"
            onChange={this.updateDescription}
            value={this.state.description}
          />
        </div>
        <div
          className={styles.footer}
          style={{
            backgroundColor: theme.secondaryText,
            color: theme.secondary
          }}
          onClick={() => {
            this.addComponent();
          }}
        >
          CREATE
        </div>
        <MdClose
          className={styles.close}
          onClick={() => {
            props.closeOverlay();
          }}
          style={{ position: 'absolute', top: 0, right: 0 }}
          size="36px"
        />
      </div>
    );
  }
}

class MenuElements extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    /**
     * 0 is home
     * 1 is components
     * 2 is variables
     */
    this.state = {
      page: 0
    };
  }

  changePage = page => {
    if (page < 0 || page > 2) return;
    this.setState({ page });
  };

  editElement = element => {
    return <div />;
  };

  deleteElement = name => {
    return delete Elements[name];
  };

  generateElement = vars => {
    let theme = this.context;
    let props = this.props;
    return (
      <div
        style={{
          backgroundColor: theme.secondary,
          color: theme.secondaryText,
          minHeight: '550px',
          minWidth: '405px',
          position: 'relative'
        }}
      >
        <div className={styles.title} style={{ color: theme.secondaryText }}>
          {vars.componentName.toUpperCase()}
        </div>
        <div>Inner stuff</div>
        <div
          className={styles.footer}
          style={{
            backgroundColor: theme.secondaryText,
            color: theme.secondary
          }}
          onClick={() => {
            // Save
            // Close
            props.closeOverlay();
          }}
        >
          <div
            style={{
              backgroundColor: theme.error,
              color: theme.errorText,
              width: '50%'
            }}
            onClick={() => {
              this.deleteElement(vars.componentName.toLowerCase());
            }}
          >
            DELETE
          </div>
          <div
            style={{
              backgroundColor: theme.secondaryText,
              color: theme.secondary,
              width: '50%'
            }}
            onClick={() => {
              props.closeOverlay();
            }}
          >
            SAVE
          </div>
        </div>
        <MdClose
          className={styles.close}
          onClick={() => {
            props.closeOverlay();
          }}
          style={{ position: 'absolute', top: 0, right: 0 }}
          size="36px"
        />
      </div>
    );
  };

  createElement = () => {
    let theme = this.context;
    let props = this.props;
    return <CreateElement closeOverlay={props.closeOverlay} />;
  };

  render() {
    let theme = this.context;
    let props = this.props;
    return (
      <ul>
        <li
          style={{
            color: theme.secondaryText,
            backgroundColor: theme.secondary
          }}
          onClick={() => {
            props.updateOverlay(this.createElement());
          }}
        >
          <MdAdd size="36px" />
        </li>
        {Object.keys(Elements).map(key => {
          let item = Elements[key];
          console.log('ITEM:', item);
          return (
            <li
              style={{
                color: theme.secondaryText,
                backgroundColor: theme.secondary,
                position: 'relative'
              }}
              key={key}
            >
              <MdEdit
                style={{ position: 'absolute', top: '5px', right: '5px' }}
                size="20px"
                onClick={() => {
                  props.updateOverlay(this.generateElement(item));
                }}
              />
              {item.componentName.toUpperCase()}
            </li>
          );
        })}
      </ul>
    );
  }
}

MenuElements.contextType = ThemeContext;
CreateElement.contextType = ThemeContext;

export default MenuElements;
