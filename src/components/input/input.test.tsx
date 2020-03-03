import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Input from './input';

let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component Input type number", () => {
    const testInputNumber = <Input id="inputNumber"
        className={"style"}
        classNameTitle=""
        title="Title Test"
        classNameInput=""
        type="number"
        placeholder="PlaceHolder Test"
        min={1}></Input>
    act(() => {
        render(testInputNumber, container);
    });
    expect(
        container.querySelector("[id='inputNumber']").getAttribute("placeholder")
      ).toEqual("PlaceHolder Test");

});

it("Render component Input type email", () => {
    const testInputMail = <Input id="inpMail"
    className=""
    classNameTitle=""
    title=""
    classNameInput=""
    type="email"
    placeholder="PlaceHolder Test"
    min={0}></Input>
    act(() => {
        render(testInputMail, container);
    });
    expect(
        container.querySelector("[id='inpMail']").getAttribute("placeholder")
      ).toEqual("PlaceHolder Test");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});