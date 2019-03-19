import React from 'react';
import { shallow } from '../enzyme';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import InputBox from './inputBox';
import { Button } from '@material-ui/core';
import {expect} from 'chai';

const mockStore = configureMockStore();
const store = mockStore({});

describe("Input box", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(<InputBox />).exists()
        ).toBe(true);
    });
    it('renders two buttons', () => {
        const wrapper = shallow(<InputBox />);
        expect(wrapper.find(Button)).to.have.lengthOf(2);
      });
});
