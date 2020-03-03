import React from 'react';


interface Props {
    id: string,
    className: string,
    classNameInner: string,
    text: string,
    click: any
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {string} classNameInner Identifier of the css class used
 * @param {string} text Article text
 * @param {any} click Function that will be executed when clicking the X
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters and texts to be displayed,
 * composing an HTML element with them.
*/
function Alert({ id, className, classNameInner, text, click}: Props) {

    return (
        <div id={id} className={className}>
            <span className={classNameInner} onClick={click}>&times;</span>
            {text}
        </div>
    );
}

export default Alert;