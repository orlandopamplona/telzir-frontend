import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Menu from './menu';

let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

const itensMenu = [
    { id: 1, name: "Item 01" },
    { id: 2, name: "Item 02" },
    { id: 3, name: "Item 03" },
    { id: 4, name: "Item 04" },
    { id: 5, name: "Item 05" },
    { id: 6, name: "Item 06" }
  ]

it("Render component Menu with visible true", () => {
    const testMenu = <Menu id="mnTest"
        classNameNav=""
        click={undefined}
        classNameClose="btn-close"
        itensMenu={itensMenu}
        visible={true}>
        Menu
    </Menu>
    act(() => {
        render(testMenu, container);
    });
    expect(container.textContent).toBe("MenuItem 01Item 02Item 03Item 04Item 05Item 06");
});

it("Render component Menu with visible false", () => {
    const testMenu = <Menu id="mnTest"
        classNameNav=""
        click={undefined}
        classNameClose="btn-close"
        itensMenu={itensMenu}
        visible={false}>
        Menu
    </Menu>
    act(() => {
        render(testMenu, container);
    });
    expect(container).toBeUndefined;
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});