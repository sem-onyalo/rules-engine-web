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
});
