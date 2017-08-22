import React from 'react';
import AddRule from './addrule';
import AddRuleSet from './addruleset';
import Config from './config';
import ListRuleSets from './listrulesets';
import RuleSetView from './rulesetview';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy, stub} from 'sinon';

describe('<RuleSetView/>', () => {
  let saveRuleSetStub;

  beforeEach(() => {
    saveRuleSetStub = stub();
  });

  it('should render AddRuleSet and ListRuleSets', () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    expect(wrapper.containsAllMatchingElements([
      <AddRuleSet/>,
      <ListRuleSets/>
    ])).to.equal(true);
  });

  it('should start with a list of empty rule sets if no rule sets from server', () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    expect(wrapper.state('ruleSets')).to.eql([]);
  });

  it('should init rule sets from data retrieved from server', async () => {
    let ruleSets = [{ Id: 1, Name: 'Rule Set A' }, { Id: 2, Name: 'Rule Set B' }];
    let getRuleSetsStub = stub().returns(Promise.resolve(ruleSets));
    let wrapper = await shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    expect(wrapper.state('ruleSets')).to.eql([[1 ,'Rule Set A'],[2, 'Rule Set B']]);
  });

  it('adds rule sets to the list', async () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    saveRuleSetStub = stub().returns(Promise.resolve({ Id: 1, Name: 'Rule Set A' }));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    await wrapper.instance().addRuleSet('Rule Set A');
    expect(wrapper.state('ruleSets')).to.eql([[1 ,'Rule Set A']]);
  });

  it('should add rule set to server', () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    saveRuleSetStub = stub().returns(Promise.resolve({ Id: 1, Name: 'Rule Set A' }));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    wrapper.instance().addRuleSet('Rule Set A');
    expect(saveRuleSetStub.calledWith({ Name: 'Rule Set A', StopProcessingOnFail: true })).to.equal(true);
  });

  it('passes addRuleSet to AddRuleSet', () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    let addRuleSet = wrapper.find(AddRuleSet);
    let addRuleSetFunc = wrapper.instance().addRuleSet;
    expect(addRuleSet.prop('onSubmit')).to.eql(addRuleSetFunc);
  });

  it('passes a bound addRuleSet function to AddRuleSet', async () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    saveRuleSetStub = stub().returns(Promise.resolve({ Id: 1, Name: 'Rule Set A' }));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    let addRuleSet = wrapper.find(AddRuleSet);
    await addRuleSet.prop('onSubmit')('Rule Set A');
    expect(wrapper.state('ruleSets')).to.eql([[1 ,'Rule Set A']]);
  });

  it('renders the items', async () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    saveRuleSetStub.onCall(0).returns(Promise.resolve({ Id: 1, Name: 'Rule Set A' }));
    saveRuleSetStub.onCall(1).returns(Promise.resolve({ Id: 2, Name: 'Rule Set B' }));
    let wrapper = mount(<RuleSetView onInit={getRuleSetsStub} onSubmit={saveRuleSetStub}/>);
    await wrapper.instance().addRuleSet('Rule Set A');
    await wrapper.instance().addRuleSet('Rule Set B');
    expect(wrapper.find('li').length).to.equal(2);
  });

  it('passes handleAddRuleSubmit to ListRuleSets', () => {
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub}/>);
    let listRuleSets = wrapper.find(ListRuleSets);
    let handleAddRuleSubmitFunc = wrapper.instance().handleAddRuleSubmit;
    expect(listRuleSets.props()).to.have.property('onAddRule');
    expect(listRuleSets.prop('onAddRule')).to.eql(handleAddRuleSubmitFunc);
  });

  it('should call onAddRule when handleAddRuleSubmit is invoked', () => {
    let addRuleSpy = spy();
    let getRuleSetsStub = stub().returns(Promise.resolve([]));
    let wrapper = shallow(<RuleSetView onInit={getRuleSetsStub} onAddRule={addRuleSpy}/>);
    wrapper.instance().handleAddRuleSubmit({ ruleSetId: 1, ruleType: 1, ruleScore: 20, emailOnFail: false, parentRuleId: 0 });
    expect(addRuleSpy.calledOnce).to.equal(true);
    expect(addRuleSpy.calledWith({ ruleSetId: 1, ruleType: 1, ruleScore: 20, emailOnFail: false, parentRuleId: 0 })).to.equal(true);
  });
});
