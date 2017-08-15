import React, {PropTypes} from 'react';

export default class AddRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruleType: 1,
      ruleScore: 0,
      emailOnFail: false,
      parentRuleId: this.props.parentRuleId ? parseInt(this.props.parentRuleId) : 0
    };

    this.setRuleType = this.setRuleType.bind(this);
    this.setRuleScore = this.setRuleScore.bind(this);
    this.setEmailOnFail = this.setEmailOnFail.bind(this);
    this.handleAddRuleClick = this.handleAddRuleClick.bind(this);
  }

  setRuleType(event) {
    this.setState({ ruleType: parseInt(event.target.value) });
  }

  setRuleScore(event) {
    this.setState({ ruleScore: parseInt(event.target.value) });
  }

  setEmailOnFail(event) {
    this.setState({ emailOnFail: event.target.checked });
  }

  handleAddRuleClick() {
    this.props.onSubmit({
      ruleType: this.state.ruleType,
      ruleScore: this.state.ruleScore,
      emailOnFail: this.state.emailOnFail
    });
  }

  render() {
    let parentRuleId = this.props.parentRuleId ? this.props.parentRuleId : '0';
    return (
      <div className="form-group row">
        <div className="col-md-8">
          <select className="form-control" onChange={this.setRuleType}>
            <option value="1">Acount Locked</option>
            <option value="2">Email Blocklist</option>
            <option value="3">Score Threshold</option>
            <option value="4">Different Email</option>
            <option value="5">Source IP</option>
            <option value="6">Orders Created</option>
            <option value="7">Requests from IP</option>
          </select>
          <input type="checkbox" onChange={this.setEmailOnFail} />&nbsp;<span>Email when rule fails</span>
        </div>
        <div className="col-md-2">
          <input className="form-control" type="text" onChange={this.setRuleScore}/>
        </div>
        <div className="col-md-2">
          <button className="btn btn-success btn-block" onClick={this.handleAddRuleClick}>Add Rule</button>
        </div>
      </div>
    );
  }
}

AddRule.PropTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
