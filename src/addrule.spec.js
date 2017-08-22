import React from 'react';
import AddRule from './addrule';
import RuleType from './model/ruletype';
import RuleEmail from './rule/ruleemail';
import RuleCountry from './rule/rulecountry';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';

describe('<AddRule/>', () => {
  it('should have a text input for the score', () => {
    let wrapper = shallow(<AddRule/>);
    expect(wrapper.find('input[type="text"]')).to.have.length(1);
  });

  it('should set the parent rule id to zero if not provided', () => {
    let wrapper = shallow(<AddRule/>);
    expect(wrapper.state('parentRuleId')).to.equal(0);
  });

  it('should set the parent rule id if provided', () => {
    let wrapper = shallow(<AddRule parentRuleId="5"/>);
    expect(wrapper.state('parentRuleId')).to.equal(5);
  });

  it('should have a select node for the rule type', () => {
    let wrapper = shallow(<AddRule/>);
    expect(wrapper.find('select')).to.have.length(1);
  });

  it('select should have all rule types as option nodes', () => {
    let wrapper = shallow(<AddRule/>);
    expect(wrapper.find('select').find('option')).to.have.length(7);
  });

  it('should have a checkbox input for email on fail', () => {
    let wrapper = shallow(<AddRule/>);
    expect(wrapper.find('input[type="checkbox"]')).to.have.length(1);
  });

  it('should have a button to save the rule', () => {
    let wrapper = shallow(<AddRule/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should save email on fail in state when changed', () => {
    let wrapper = mount(<AddRule/>);
    let input = wrapper.find('input[type="checkbox"]');
    input.simulate('change', { target: { checked: true } });
    expect(wrapper.state('emailOnFail')).to.equal(true);
  });

  it('should save rule type in state when changed', () => {
    let wrapper = mount(<AddRule/>);
    let select = wrapper.find('select');
    select.simulate('change', { target: { value: '3' } });
    expect(wrapper.state('ruleType')).to.equal(3);
  });

  it('should save rule score in state when changed', () => {
    let wrapper = mount(<AddRule/>);
    let input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 20 } });
    expect(wrapper.state('ruleScore')).to.equal(20);
  });

  it('should call onSubmit when Add button is clicked', () => {
    let addRuleSpy = spy();
    let wrapper = shallow(<AddRule onSubmit={addRuleSpy}/>);
    wrapper.setState({ ruleType: 3, ruleScore: 20, emailOnFail: true });
    let button = wrapper.find('button');
    button.simulate('click');
    expect(addRuleSpy.calledOnce).to.equal(true);
    expect(addRuleSpy.calledWith({ ruleType: 3, ruleScore: 20, emailOnFail: true, parentRuleId: 0 })).to.equal(true);
  });

  it('should load RuleEmail component when the emailOnFail value in state changes to true', () => {
    let wrapper = mount(<AddRule/>);
    let input = wrapper.find('input[type="checkbox"]');
    input.simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.containsAllMatchingElements([
      <RuleEmail/>
    ])).to.equal(true);
  });

  it('should load RuleCountry component when the rule type in state changes to RuleType.SOURCE_IP', () => {
    let wrapper = mount(<AddRule/>);
    let select = wrapper.find('select');
    select.simulate('change', { target: { value: RuleType.SOURCE_IP.toString() }});
    wrapper.update();
    expect(wrapper.containsAllMatchingElements([
      <RuleCountry/>
    ])).to.equal(true);
  });
});
