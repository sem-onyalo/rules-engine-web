import React from 'react';
import AddRule from './addrule';
import ListRuleSets from './listrulesets';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('<ListRuleSets/>', () => {
  it('should render zero items', () => {
    let wrapper = shallow(<ListRuleSets items={[]}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render undefined items', () => {
    let wrapper = shallow(<ListRuleSets items={undefined}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render some items', () => {
    let items = ['Rule Set A', 'Rule Set B', 'Rule Set C'];
    let wrapper = shallow(<ListRuleSets items={items}/>);
    expect(wrapper.find('li')).to.have.length(3);
  });

  it('should render an item with the data attribute rule-set-id', () => {
    let items = [[1, 'Rule Set A']];
    let wrapper = shallow(<ListRuleSets items={items}/>);
    expect(wrapper.find('li').get(0).props['data-rule-set-id']).to.equal(1);
  });

  it('should render an item with the inner HTML as the rule set name', () => {
    let items = [[1, 'Rule Set A']];
    let wrapper = shallow(<ListRuleSets items={items}/>);
    expect(wrapper.find('li').find('span').get(0).props.children).to.equal('Rule Set A');
  });

  it('should render a button with the data attribute rule-set-id to load rules', () => {
    let items = [[1, 'RuleSet A']];
    let wrapper = shallow(<ListRuleSets items={items}/>);
    let button = wrapper.find('li').at(0).find('button');
    expect(button).to.have.length(1);
    expect(button.get(0).props['data-rule-set-id']).to.equal(1);
  });

  it('should render rules for a rule set when button is clicked', () => {
    let items = [[1, 'RuleSet A']];
    let wrapper = shallow(<ListRuleSets items={items}/>);
    let button = wrapper.find('li').at(0).find('button');
    button.simulate('click');
    wrapper.update();
    expect(wrapper.find('li').at(0).containsAllMatchingElements([
      <AddRule/>
    ])).to.equal(true);
  });
});
