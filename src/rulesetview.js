import React, {PropTypes} from 'react';
import AddRuleSet from './addruleset';
import Config from './config';
import ListRuleSets from './listrulesets';

export default class RuleSetView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruleSets: []
    };
    this.addRuleSet = this.addRuleSet.bind(this);
    this.initRuleSets = this.initRuleSets.bind(this);
  }

  async addRuleSet(name) {
    let ruleSet = await this.props.onSubmit({ Name: name, StopProcessingOnFail: true }); // hardcode StopProcessingOnFail for now
    this.setState({
      ruleSets: [].concat(this.state.ruleSets).concat([[ruleSet.Id, ruleSet.Name]])
    });
  }

  async initRuleSets() {
    let ruleSets = await this.props.onInit();
    if (ruleSets && ruleSets.length > 0) {
      this.setState({
        ruleSets: [].concat(this.state.ruleSets)
          .concat(ruleSets.map((item) => [item.Id, item.Name]))
      });
    }
  }

  componentWillMount() {
    this.initRuleSets();
  }

  render() {
    return (
      <div className="container-fluid">
        <AddRuleSet onSubmit={this.addRuleSet}/>
        <ListRuleSets items={this.state.ruleSets}/>
      </div>
    );
  }
}

RuleSetView.PropTypes = {
  onInit: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};
