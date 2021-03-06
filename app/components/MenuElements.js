// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './MenuElements.css';
import { ThemeContext } from '../utils/theme-context';

import validFilename from 'valid-filename';
import { deleteComponent, getTemplates } from '../utils/helpers';

import { MdAdd, MdEdit, MdClose } from 'react-icons/md';

import Select from './Select';
import Input from './InputText';
import Toggle from './Toggle';
import Variables from './Variables';

type Props = {};

class CreateElement extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      componentName: '',
      default: false,
      description: '',
      vars: {
        style: {
          backgroundColor: '#3f3f3f'
        }
      },
      error: null,
      hasChildren: true,
      search: '',
      searchVariable: ''
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
    let Elements = this.props.Elements;
    // TODO replace return with an error
    if (Elements[name]) {
      this.newError('Component with that name already exists!');
      return;
    }
    if (!validFilename(name) || name.includes(' ') || name.includes('-')) {
      return this.newError('Invalid name, no special chars!');
    } else if (name.length === 0) {
      return this.newError('Please enter a name!');
    }
    if (this.state.search === '' || this.state.search === null) {
      return this.newError('Please select a template to choose from!');
    }
    let obj = Object.assign({}, this.state);
    delete obj.error;
    this.props.makeNewComponent({
      name: this.state.componentName,
      desc: this.state.description,
      hasChildren: this.state.hasChildren
    });
    this.props.closeOverlay();
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  select = val => {
    this.setState({ search: val });
  };

  updateName = e => {
    this.setState({ componentName: e.target.value });
  };

  updateDescription = e => {
    this.setState({ description: e.target.value });
  };

  updateHasChildren = () => {
    this.setState({ hasChildren: !this.state.hasChildren });
  };

  render() {
    let theme = this.context;
    let props = this.props;
    console.log('PROPS 2', props);
    return (
      <div
        className={styles.createElement}
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
          <div className={styles.head}>NEW COMPONENT</div>
          <Input
            title="Component Name"
            placeholder="Enter a name..."
            search={this.state.componentName}
            onChange={this.updateName}
          />
          <Input
            title="Component Description"
            placeholder="Enter a description..."
            search={this.state.description}
            onChange={this.updateDescription}
          />
          <Toggle
            title="Has Children"
            onClick={this.updateHasChildren}
            value={this.state.hasChildren}
          />
          <Variables
            title="Variables"
            placeholder="Search..."
            children={Object.assign({}, this.state.vars)}
            search={this.state.searchVariable}
            updateSearch={this.updateSearchVariable}
            path={props.id}
            makeOverlay={props.updateSecondaryOverlay}
          />
          <Select
            children={getTemplates()}
            search={this.state.search}
            updateSearch={this.updateSearch}
            path={props.id}
            select={this.select}
            newError={this.newError}
            clearError={this.clearError}
            title={'Select Template'}
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
    deleteComponent(name);
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
    return (
      <CreateElement
        closeOverlay={props.closeOverlay}
        Elements={props.Elements}
        makeNewComponent={props.makeNewComponent}
        updateSecondaryOverlay={props.updateSecondaryOverlay}
      />
    );
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
        {Object.keys(props.Elements).map(key => {
          let item = props.Elements[key];
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
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  display: item.default ? 'none' : 'block'
                }}
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
