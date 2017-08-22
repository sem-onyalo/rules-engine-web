import React from 'react';
import AddRule from './addrule';

export default class ListRuleSets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruleSetIdsOfRenderedRules: []
    };

    this.renderRules = this.renderRules.bind(this);
    this.handleAddRuleSubmit = this.handleAddRuleSubmit.bind(this);
    this.setRuleSetIdOfRenderedRules = this.setRuleSetIdOfRenderedRules.bind(this);
  }

  setRuleSetIdOfRenderedRules(ruleSetId) {
    this.setState({
      ruleSetIdsOfRenderedRules: [].concat(this.state.ruleSetIdsOfRenderedRules).concat([ruleSetId])
    });
  }

  handleAddRuleSubmit(ruleSetId, args) {
    args.ruleSetId = ruleSetId;
    this.props.onAddRule(args);
  }

  renderRules(ruleSetId) {
    if (this.state.ruleSetIdsOfRenderedRules.indexOf(ruleSetId) >= 0) {
      return (
        <div className="rules-container">
          <AddRule onSubmit={(args) => this.handleAddRuleSubmit(ruleSetId, args)}/>
        </div>
      );
    }
  }

  render() {
    return this.props.items ?
      (<ul className="list-group">
        {this.props.items.map((item, index) => (
          <li key={index} className="list-group-item" data-rule-set-id={item[0]}>
            <span>{item[1]}</span>&nbsp;&nbsp;
            <button onClick={() => this.setRuleSetIdOfRenderedRules(item[0])} className="btn btn-xs btn-primary" data-rule-set-id={item[0]}>Load Rules</button>
            {this.renderRules(item[0])}
          </li>
        ))}
      </ul>)
    : null;
  }
}
