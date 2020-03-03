import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import testImg from './testImg.png'

import Article from './article';

let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component Article", () => {
    const testArticle = <Article id="artTest"
        className=""
        classNameInner=""
        imgSrc={testImg}
        imgAlt="Text image"
        title="Text image"
        subTitle="SubTitle"
        text="Testing testing testing testing"
    ></Article>
    act(() => {
        render(testArticle, container);
    });
    expect(container.textContent).toContain("Testing testing testing testing");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});