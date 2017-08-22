import Config from './config';
import React from 'react';
import RestApiClient from './util/rest-api-client';
import RuleSetView from './rulesetview';

export default class ViewManager extends React.Component {
  constructor(props) {
    super(props);

    this._restApiClient = new RestApiClient();

    this.saveRule = this.saveRule.bind(this);
    this.getRuleSets = this.getRuleSets.bind(this);
    this.saveRuleSet = this.saveRuleSet.bind(this);
  }

  async saveRule(request) {
    let auth = undefined;
    let postResponse = await this._restApiClient.postJsonRequest(Config.FsApiUri + '/rules', auth, {
      RuleSetId: request.ruleSetId,
      ParentRuleId: request.parentRuleId,
      RuleType: request.ruleType,
      RuleScore: request.ruleScore,
      EmailOnFail: request.emailOnFail
    });
    return postResponse;
  }

  async getRuleSets() {
    let getResponse = await this._restApiClient.getRequest(Config.FsApiUri + '/rulesets');
    let getResponseJson = JSON.parse(getResponse);
    return getResponseJson.rulesets;
  }

  async saveRuleSet(request) {
    let auth = undefined;
    let requestBody = { Name: request.Name, StopProcessingOnFail: request.StopProcessingOnFail };
    let postResponse = await this._restApiClient.postJsonRequest(Config.FsApiUri + '/rulesets', auth, requestBody);
    return postResponse;
  }

  render() {
    return (
      <div>
        <RuleSetView onInit={this.getRuleSets} onSubmit={this.saveRuleSet} onAddRule={this.saveRule}/>
      </div>
    );
  }
}
