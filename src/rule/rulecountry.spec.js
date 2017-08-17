import React from 'react';
import RuleCountry from './rulecountry';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {stub} from 'sinon';
import {spy} from 'sinon';

describe('<RuleCountry/>', () => {
  it('should render an input for the country codes', () => {
    let getCountryCodesStub = stub().returns([]);
    let wrapper = shallow(<RuleCountry onInit={getCountryCodesStub}/>);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should start with an empty country code value if no country codes from server', () => {
    let getCountryCodesStub = stub().returns([]);
    let wrapper = shallow(<RuleCountry onInit={getCountryCodesStub}/>);
    let input = wrapper.find('input');
    expect(input.get(0).props['value']).to.equal('');
  });

  it('should start with an empty country code value if country codes from server is undefined', () => {
    let getCountryCodesStub = stub().returns(undefined);
    let wrapper = shallow(<RuleCountry onInit={getCountryCodesStub}/>);
    let input = wrapper.find('input');
    expect(input.get(0).props['value']).to.equal('');
  });

  it('should create a comma-separated list of country codes value if values passed from server', () => {
    let getCountryCodesStub = stub().returns(['CA', 'US']);
    let wrapper = shallow(<RuleCountry onInit={getCountryCodesStub}/>);
    let input = wrapper.find('input');
    expect(input.get(0).props['value']).to.equal('CA,US');
  });

  it('should call onCountryCodeChange when the country code value changes', () => {
    let setCountryCodesSpy = spy();
    let getCountryCodesStub = stub().returns([]);
    let wrapper = shallow(<RuleCountry onInit={getCountryCodesStub} onCountryCodeChange={setCountryCodesSpy}/>);
    let input = wrapper.find('input');
    input.simulate('change', { target: { value: 'CA' }});
    expect(setCountryCodesSpy.calledOnce).to.equal(true);
    expect(setCountryCodesSpy.calledWith('CA')).to.equal(true);
  });
});
