import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SimulateResult from './simulateResult';

let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component SimulateResult", () => {
    const testSimulateResult = <SimulateResult id="srTest"
    className=""
    classNameFirstResult=""
    textFirstResult="First Text"
    classNameSecondResult=""
    textSecondResult="Second Text"
  ></SimulateResult>
    act(() => {
        render(testSimulateResult, container);
    });
    expect(container.textContent).toBe("First TextSecond Text");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});