import React, {PropTypes} from 'react';

export default class RuleCountry extends React.Component {
  constructor(props) {
    super(props);

    this.handleCountryCodesChange = this.handleCountryCodesChange.bind(this);
  }

  handleCountryCodesChange(event) {
    this.props.onCountryCodeChange(event.target.value);
  }

  render() {
    let countryCodes = this.props.onInit() ? this.props.onInit().join(',') : '';

    return (
      <div className="row">
        <div className="col-md-12">
          <input type="text" className="form-control" placeholder="Country codes (comma delimited):" value={countryCodes} onChange={this.handleCountryCodesChange}/>
        </div>
      </div>
    );
  }
}

RuleCountry.PropTypes = {
  onInit: React.PropTypes.func.isRequired
};
