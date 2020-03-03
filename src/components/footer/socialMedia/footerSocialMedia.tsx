import React from 'react';


interface Props {
    id: string,
    className: string,
    classNameItens: string,
    classNameCopyRight: string,
    textCopyright: string,
    children: any
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {string} classNameItens Identifier of the css class used
 * @param {string} classNameCopyRight Identifier of the css class used
 * @param {string} textCopyright Text Copyright that will be displayed
 * @param {any} children Element that will be inserted inside the component
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters to be displayed,
 * composing an HTML element with them.
*/
function FooterSocialMedia({ id, className, classNameItens, classNameCopyRight, textCopyright, children }: Props) {

    return (
        <footer id={id} className={className}>
        <div className={classNameItens}>
          {children}
        </div>
        <p className={classNameCopyRight}>
          {textCopyright}
          </p>
      </footer>
    );
}

export default FooterSocialMedia;