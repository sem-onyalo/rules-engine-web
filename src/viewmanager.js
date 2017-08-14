import Config from './config';
import React from 'react';
import RestApiClient from './util/rest-api-client';
import RuleSetView from './rulesetview';

export default class ViewManager extends React.Component {
  constructor(props) {
    super(props);

    this._restApiClient = new RestApiClient();

    this.getRuleSets = this.getRuleSets.bind(this);
  }

  async getRuleSets() {
    let getResponse = await this._restApiClient.getRequest(Config.FsApiUri + '/rulesets');
    let getResponseJson = JSON.parse(getResponse);
    return getResponseJson.rulesets;
  }

  render() {
    return (
      <div>
        <RuleSetView onInit={this.getRuleSets}/>
      </div>
    );
  }
}
