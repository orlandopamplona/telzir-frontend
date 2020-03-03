import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Alert from './alert';

let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component Alert", () => {
    act(() => {
        render(<Alert id="alertTest" className="" classNameInner="" text="Alert Test" click={undefined}></Alert>, container);
    });
    expect(container.textContent).toContain("Alert Test");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});