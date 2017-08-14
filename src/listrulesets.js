import React from 'react';

export default class ListRuleSets extends React.Component {
  render() {
    return this.props.items ?
      (<ul className="list-group">
        {this.props.items.map((item, index) => (
          <li key={index} className="list-group-item">{item}</li>
        ))}
      </ul>)
    : null;
  }
}
