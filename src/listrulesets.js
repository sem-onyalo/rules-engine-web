import React from 'react';

export default class ListRuleSets extends React.Component {
  render() {
    return this.props.items ?
      (<ul className="list-group">
        {this.props.items.map((item, index) => (
          <li key={index} className="list-group-item" data-rule-set-id={item[0]}>{item[1]}</li>
        ))}
      </ul>)
    : null;
  }
}
