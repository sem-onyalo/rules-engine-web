import React from 'react';
import AddRuleSet from './addruleset';
import Config from './config';
import ListRuleSets from './listrulesets';
import RuleSetView from './rulesetview';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import {stub} from 'sinon';

describe('<RuleSetView/>', () => {
  it('should render AddRuleSet and ListRuleSets', () => {
    let getRuleSetsStub = stub().returns([]);
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);
    expect(wrapper.containsAllMatchingElements([
      <AddRuleSet/>,
      <ListRuleSets/>
    ])).to.equal(true);
  });

  it('should start with a list of empty rule sets if no rule sets from server', () => {
    let getRuleSetsStub = stub().returns([]);
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);
    expect(wrapper.state('ruleSets')).to.eql([]);
  });

  it('should init rule sets from data retrieved from server', () => {
    let getRuleSetsStub = stub().returns([{ Id: 1, Name: 'Rule Set A' }, { Id: 2, Name: 'Rule Set B' }]);
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);

    expect(wrapper.state('ruleSets')).to.eql(['Rule Set A', 'Rule Set B']);
  });

  it('adds rule sets to the list', () => {
    let getRuleSetsStub = stub().returns([]);
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);
    wrapper.instance().addRuleSet('Rule Set A');
    expect(wrapper.state('ruleSets')).to.eql(['Rule Set A']);
  });

  it('passes addRuleSet to AddRuleSet', () => {
    let getRuleSetsStub = stub().returns([]);
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);
    let addRuleSet = wrapper.find(AddRuleSet);
    let addRuleSetFunc = wrapper.instance().addRuleSet;
    expect(addRuleSet.prop('onSubmit')).to.eql(addRuleSetFunc);
  });

  it('passes a bound addRuleSet function to AddRuleSet', () => {
    let getRuleSetsStub = stub().returns([]);
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);
    let addRuleSet = wrapper.find(AddRuleSet);
    addRuleSet.prop('onSubmit')('Rule Set A');
    expect(wrapper.state('ruleSets')).to.eql(['Rule Set A']);
  });

  it('renders the items', () => {
    let getRuleSetsStub = stub().returns([]);
    let wrapper = mount(<RuleSetView onInit={getRuleSetsStub}/>);
    wrapper.instance().addRuleSet('Rule Set A');
    wrapper.instance().addRuleSet('Rule Set B');
    expect(wrapper.find('li').length).to.equal(2);
  });
});
