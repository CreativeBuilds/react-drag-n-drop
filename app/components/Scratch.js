// @flow
import React, { Component } from 'react';
import styles from './Scratch.css';

import { MdAddCircle } from 'react-icons/md';

type Props = {};

class Scratch extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.content;
    if (!content.children) content.children = {};
    let bgColor;
    if (!content.meta) {
      bgColor = 'blue';
    } else if (!content.meta.backgroundColor) {
      bgColor = 'blue';
    } else {
      bgColor = content.meta.backgroundColor;
    }
    let style = this.props.style || {};
    style.backgroundColor = bgColor;
    return (
      <div className={styles.wrapper} style={style}>
        <div className={styles.title}>
          {(content.componentName || '').toUpperCase()}
        </div>
        <div className={styles.add}>
          <MdAddCircle
            size="24px"
            onClick={() => {
              let id = this.props.parent ? this.props.parent : '/';
              this.props.addComponent(id);
            }}
          />
        </div>
        {Object.keys(content.children).map(key => {
          let child = content.children[key];
          let id = this.props.parent ? `${this.props.parent}/${key}` : key;
          let bgColor;
          if (!child.meta) {
            bgColor = 'blue';
          } else if (!child.meta.backgroundColor) {
            bgColor = 'blue';
          } else {
            bgColor = child.meta.backgroundColor;
          }
          return (
            <Scratch
              content={child}
              style={{ backgroundColor: bgColor }}
              addComponent={this.props.addComponent}
              parent={id}
            />
          );
        })}
      </div>
    );
  }
}

export default Scratch;
