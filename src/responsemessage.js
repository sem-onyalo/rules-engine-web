import React from 'react';

export default class ResponseMessage extends React.Component {
  render() {
    let classNames = 'response-message ' + this.props.type;
    return (
      <div>
        <span className={classNames}>{this.props.message}</span>
      </div>
    );
  }
}
