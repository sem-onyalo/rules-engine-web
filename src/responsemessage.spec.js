import React from 'react';
import ResponseMessage from './responsemessage';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('<ResponseMessage/>', () => {
  it('should render a span', () => {
    let wrapper = shallow(<ResponseMessage/>);
    expect(wrapper.containsAllMatchingElements([<span/>])).to.equal(true);
  });

  it('should render a span with the provided message', () => {
    let wrapper = shallow(<ResponseMessage message="Saved successfully"/>);
    expect(wrapper.find('.response-message').get(0).props.children).to.equal("Saved successfully");
  });

  it('should render a span with the class response-message and the provided type', () => {
    let wrapper = shallow(<ResponseMessage type="success"/>);
    expect(wrapper.find('.response-message.success')).to.have.length(1);
  });
});
