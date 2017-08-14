import React, {PropTypes} from 'react';
import ResponseMessage from './responsemessage';

export default class AddRuleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      responseMessage: { display: false }
    };
    this._responseMessageTimeout = 3000;
    this.setText = this.setText.bind(this);
    this.handleAddRuleSetClick = this.handleAddRuleSetClick.bind(this);
    this.displayResponseMessage = this.displayResponseMessage.bind(this);
  }

  setText(event) {
    this.setState({ text: event.target.value });
  }

  handleAddRuleSetClick() {
    this.props.onSubmit(this.state.text);
    let responseMessage = { display: true, type: 'success', message: 'Added!' };
    this.setState({ responseMessage: responseMessage });
  }

  displayResponseMessage() {
    if (this.state.responseMessage.display) {
      setTimeout(function() { this.setState({ responseMessage: {display:false} }); }.bind(this), this._responseMessageTimeout);
      return <ResponseMessage type={this.state.responseMessage.type} message={this.state.responseMessage.message}/>;
    }
  }

  render() {
    return (
      <div className="form-group row">
        <div className="col-md-10">
          <input ref={input => this.addRuleSetInput = input} className="form-control" type="text" value={this.state.text} onChange={this.setText}/>
          {this.displayResponseMessage()}
        </div>
        <div className="col-md-2">
          <button onClick={this.handleAddRuleSetClick} className="btn btn-success btn-block">Add Rule Set</button>
        </div>
      </div>
    );
  }
}

AddRuleSet.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
