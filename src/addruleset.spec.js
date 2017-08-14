import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';

import AddRuleSet from './addruleset';

describe('<AddRuleSet/>', () => {
  it('should have a text input for the name', () => {
    let wrapper = shallow(<AddRuleSet/>);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should have a button to save the rule set', () => {
    let wrapper = shallow(<AddRuleSet/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should accept input', () => {
    let wrapper = mount(<AddRuleSet/>);
    let input = wrapper.find('input');
    input.simulate('change', { target: { value: 'Resin' }});
    expect(wrapper.state('text')).to.equal('Resin');
    expect(input.prop('value')).to.equal('Resin');
  });

  it('should call onSubmit when Add button is clicked', () => {
    let addRuleSetSpy = spy();
    let wrapper = shallow(<AddRuleSet onSubmit={addRuleSetSpy}/>);
    wrapper.setState({text: 'Rule Set A'});
    let button = wrapper.find('button');
    button.simulate('click');
    expect(addRuleSetSpy.calledOnce).to.equal(true);
    expect(addRuleSetSpy.calledWith('Rule Set A')).to.equal(true);
  });
});
