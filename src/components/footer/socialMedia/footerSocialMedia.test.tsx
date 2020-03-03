import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import FooterSocialMedia from './footerSocialMedia';

let container: any = null;

const socialMedia = <div>
  <a href="https://www.facebook.com/VizirSoftwareStudio"><i className="fa fa-facebook"></i></a>
  <a href="https://twitter.com/myvizir"><i className="fa fa-twitter"></i></a>
  <a href="https://github.com/Vizir"><i className="fa fa-github"></i></a>
  <a href="https://www.linkedin.com/company/1151827"><i className="fa fa-linkedin"></i></a>
  <a href="https://www.youtube.com/channel/UCoJlmD3SjP2d6pIgSjfGtdA"><i className="fa fa-youtube"></i></a>
</div>

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component FooterSocialMedia", () => {
    const testFooterSM = <FooterSocialMedia id="footerTest"
    className=""
    classNameItens=""
    classNameCopyRight=""
    textCopyright="Copyright © Test 2020."
  >{socialMedia}</FooterSocialMedia>
    act(() => {
        render(testFooterSM, container);
    });
    expect(container.textContent).toBe("Copyright © Test 2020.");

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});