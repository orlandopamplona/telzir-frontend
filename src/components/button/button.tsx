import React from 'react';

interface Props {
  id: string,
  className: string,
  click: any,
  children: any
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {any} click Function that will be executed when clicking the button
 * @param {any} children Element that will be inserted inside the button
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters to be displayed,
 * composing an HTML element with them.
*/
function Button({ id, className, click, children }: Props) {
  return (
    <button id={id} className={className} onClick={click}>{children}</button>
  );
}

export default Button;