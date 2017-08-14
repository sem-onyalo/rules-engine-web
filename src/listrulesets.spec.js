import React from 'react';
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
});
