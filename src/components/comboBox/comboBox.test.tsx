import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ComboBox from './comboBox';

let container: any = null;

const itensSelect = [
    { id: "1", name: "Item 01" },
    { id: "2", name: "Item 02" },
    { id: "3", name: "Item 03" },
    { id: "4", name: "Item 04" }
];

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component ComboBox with itens", () => {
    act(() => {
        render(<ComboBox id="cbTest" className="" classNameTitle="" title="ComboBox Title" changeFunction={undefined} placeHolder="Choose value" itensSelect={itensSelect}></ComboBox>, container);
    });
    expect(container.textContent).toBe("ComboBox TitleChoose valueItem 01Item 02Item 03Item 04");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});