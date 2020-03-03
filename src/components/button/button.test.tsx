import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from './button';

let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component Button", () => {
    act(() => {
        render(<Button id="btnMenuTest" className="" click={undefined}>Button Test</Button>, container);
    });
    expect(container.textContent).toBe("Button Test");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});