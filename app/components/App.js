import React, { Component } from 'react';
import styles from './App.css';
import { ThemeContext } from '../utils/theme-context';

import Select from './Select';
import Scratch from './Scratch';

import uuidv4 from 'uuid/v4';

import { addChildToTree } from '../utils/helpers';

import DefaultElements from '../utils/default-elements';

type Props = {};

class App extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    let children = {};
    this.state = {
      content: {},
      children: {}
    };
  }

  componentDidMount = () => {
    let obj = DefaultElements;
    let content = obj['app'];
    this.setState({ children: obj, content });
  };

  submit = (name, id) => {
    if (!this.state.children[name.toLowerCase()]) {
      return console.error(
        `${name} does not exist in the current context of children`
      );
    }
    addChildToTree({
      id,
      children: this.state.content,
      child: this.state.children[name.toLowerCase()]
    }).then(info => {
      this.setState({ content: info });
    });
  };

  addComponent = id => {
    let props = this.props;
    let { updateOverlay, closeOverlay } = props;
    updateOverlay(
      <Select
        children={this.state.children}
        submit={this.submit}
        path={id}
        close={closeOverlay}
      />
    );
  };

  render() {
    let theme = this.context;
    let props = this.props;
    return (
      <div className={styles.app}>
        <Scratch
          content={this.state.content}
          style={{ backgroundColor: 'red' }}
          addComponent={this.addComponent}
        />
      </div>
    );
  }
}

App.contextType = ThemeContext;

export default App;
