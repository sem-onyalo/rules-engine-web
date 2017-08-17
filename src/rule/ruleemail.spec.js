import React from 'react';
import RuleEmail from './ruleemail';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';

describe('<RuleEmail/>', () => {
  it('should render an input element for the email to', () => {
    let wrapper = shallow(<RuleEmail/>);
    expect(wrapper.find('input[placeholder="Email to:"]')).to.have.length(1);
  });

  it('should render an input element for the email subject', () => {
    let wrapper = shallow(<RuleEmail/>);
    expect(wrapper.find('input[placeholder="Email subject:"]')).to.have.length(1);
  });

  it('should render an textarea for the email body', () => {
    let wrapper = shallow(<RuleEmail/>);
    expect(wrapper.find('textarea')).to.have.length(1);
  });

  it('should render the email to input with value passed in props', () => {
    let wrapper = shallow(<RuleEmail emailTo="fraudteam@loyalty.com"/>);
    let input = wrapper.find('input[placeholder="Email to:"]');
    expect(input.get(0).props['value']).to.equal('fraudteam@loyalty.com');
  });

  it('should render the email subject input with the value passed in props', () => {
    let wrapper = shallow(<RuleEmail emailSubject="Fraud Alert"/>);
    let input = wrapper.find('input[placeholder="Email subject:"]');
    expect(input.get(0).props['value']).to.equal('Fraud Alert');
  });

  it('should render the email body textarea with the value passed in props', () => {
    let wrapper = shallow(<RuleEmail emailBody="Fraud has occurred for reason: X"/>);
    let input = wrapper.find('textarea');
    expect(wrapper.find('textarea').get(0).props.children).to.equal("Fraud has occurred for reason: X");
  });

  it('should call onEmailToChange when the email to value changes', () => {
    let setEmailToSpy = spy();
    let wrapper = shallow(<RuleEmail onEmailToChange={setEmailToSpy}/>);
    let input = wrapper.find('input[placeholder="Email to:"]');
    input.simulate('change', { target: { value: 'fraudteam@loyalty.com' }});
    expect(setEmailToSpy.calledOnce).to.equal(true);
    expect(setEmailToSpy.calledWith('fraudteam@loyalty.com')).to.equal(true);
  });

  it('should call onEmailSubjectChange when the email subject value changes', () => {
    let setEmailSubjectSpy = spy();
    let wrapper = shallow(<RuleEmail onEmailSubjectChange={setEmailSubjectSpy}/>);
    let input = wrapper.find('input[placeholder="Email subject:"]');
    input.simulate('change', { target: { value: 'Fraud Alert' }});
    expect(setEmailSubjectSpy.calledOnce).to.equal(true);
    expect(setEmailSubjectSpy.calledWith('Fraud Alert')).to.equal(true);
  });

  it('should call onEmailBodyChange when the email body value changes', () => {
    let setEmailBodySpy = spy();
    let wrapper = shallow(<RuleEmail onEmailBodyChange={setEmailBodySpy}/>);
    let input = wrapper.find('textarea');
    input.simulate('change', { target: { value: 'Fraud has occurred for reason: X' }});
    expect(setEmailBodySpy.calledOnce).to.equal(true);
    expect(setEmailBodySpy.calledWith('Fraud has occurred for reason: X')).to.equal(true);
  });
});
