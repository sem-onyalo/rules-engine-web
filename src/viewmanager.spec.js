import React from 'react';
import RuleSetView from './rulesetview';
import ViewManager from './viewmanager';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {stub} from 'sinon';

describe('<ViewManager/>', () => {
  it('should render RuleSetView', () => {
    let wrapper = shallow(<ViewManager/>);
    expect(wrapper.containsAllMatchingElements([<RuleSetView/>])).to.equal(true);
  });

  it('passes getRuleSets to RuleSetView', () => {
    let wrapper = shallow(<ViewManager/>);
    let ruleSetView = wrapper.find(RuleSetView);
    expect(ruleSetView.props()).to.have.property('onInit');
    expect(ruleSetView.prop('onInit')).to.eql(wrapper.instance().getRuleSets);
  });

  it('passes saveRuleSet to RuleSetView', () => {
    let wrapper = shallow(<ViewManager/>);
    let ruleSetView = wrapper.find(RuleSetView);
    expect(ruleSetView.props()).to.have.property('onSubmit');
    expect(ruleSetView.prop('onSubmit')).to.eql(wrapper.instance().saveRuleSet);
  });

  it('passes saveRule to RuleSetView', () => {
    let wrapper = shallow(<ViewManager/>);
    let ruleSetView = wrapper.find(RuleSetView);
    expect(ruleSetView.props()).to.have.property('onAddRule');
    expect(ruleSetView.prop('onAddRule')).to.eql(wrapper.instance().saveRule);
  });
});
