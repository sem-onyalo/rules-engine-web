import React, {PropTypes} from 'react';

export default class RuleEmail extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailToChange = this.handleEmailToChange.bind(this);
    this.handleEmailBodyChange = this.handleEmailBodyChange.bind(this);
    this.handleEmailSubjectChange = this.handleEmailSubjectChange.bind(this);
  }

  handleEmailToChange(event) {
    this.props.onEmailToChange(event.target.value);
  }

  handleEmailBodyChange(event) {
    this.props.onEmailBodyChange(event.target.value);
  }

  handleEmailSubjectChange(event) {
    this.props.onEmailSubjectChange(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Email to:" value={this.props.emailTo} onChange={this.handleEmailToChange}/>
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Email subject:" value={this.props.emailSubject} onChange={this.handleEmailSubjectChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <textarea className="form-control" placeholder="Email body:" onChange={this.handleEmailBodyChange}>{this.props.emailBody}</textarea>
          </div>
        </div>
      </div>
    );
  }
}
