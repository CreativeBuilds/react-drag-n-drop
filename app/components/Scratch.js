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
    let { props } = this;
    let { content } = props;
    let vars = {};
    if (!content.children) content.children = {};
    let bgColor = 'blue';
    if (!content.vars || !content.vars.style) {
    } else {
      vars = content.vars;
      if (!content.vars.style.backgroundColor) {
      } else {
        bgColor = content.vars.style.backgroundColor;
      }
    }
    // console.log(vars.style, props.style);
    let varStyle = Object.assign({}, vars.style);
    let style = Object.assign(Object.assign(props.style || {}, {}), varStyle);
    style.backgroundColor = bgColor;
    return (
      <div className={styles.wrapper} style={style}>
        <div className={styles.title}>
          {(content.componentName || '').toUpperCase()}
        </div>
        <div className={styles.add}>
          {content.hasChildren ? (
            <MdAddCircle
              size="24px"
              onClick={() => {
                let id = this.props.parent ? this.props.parent : '/';
                this.props.addComponent(id);
              }}
            />
          ) : null}
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
