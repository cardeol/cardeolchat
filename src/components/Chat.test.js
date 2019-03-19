import React from 'react';
import { shallow } from '../enzyme';
import configureMockStore from "redux-mock-store";
import Chat from './Chat';
import { Provider } from "react-redux";
import InputBox from './inputBox';

const mockStore = configureMockStore();
const store = mockStore({});

describe("Chat page", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(<Provider store={store}><Chat /></Provider>).exists()
        ).toBe(true);
    });
    it('renders one inputbox', () => {
        const wrapper = shallow(<Provider store={store}><Chat /></Provider>);
        expect(wrapper.find(InputBox)).to.have.lengthOf(1);
      });
});
