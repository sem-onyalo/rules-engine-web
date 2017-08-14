import React, {PropTypes} from 'react';

export default class AddRuleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.setText = this.setText.bind(this);
    this.handleAddRuleSetClick = this.handleAddRuleSetClick.bind(this);
  }

  setText(event) {
    this.setState({ text: event.target.value });
  }

  handleAddRuleSetClick() {
    this.props.onSubmit(this.state.text);
  }

  render() {
    return (
      <div className="form-group">
        <div className="col-md-10">
          <input className="form-control" type="text" value={this.state.text} onChange={this.setText}/>
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
