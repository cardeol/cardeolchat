import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { configure, shallow, mount, render } from './enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from './App';

const mockStore = configureMockStore();
const store = mockStore({});

describe("Main App Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <App />
                </Provider>
            ).exists()
        ).toBe(true);
    });
});
