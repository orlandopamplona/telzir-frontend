import React from 'react';


interface Props {
    id: string,
    className: string,
    classNameFirstResult: string,
    classNameSecondResult: string,
    textFirstResult: string,
    textSecondResult: string
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {string} classNameFirstResult Identifier of the css class used
 * @param {string} classNameSecondResult Identifier of the css class used
 * @param {string} textFirstResult Displayed text
 * @param {string} textSecondResult Displayed text
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters and texts to be displayed,
 * composing an HTML element with them.
*/
function SimulateResult({ id, className, classNameFirstResult, classNameSecondResult, textFirstResult, textSecondResult }: Props) {

    return (
        <div id={id} className={className}>
          <div id={"divWithProduct"} className={classNameFirstResult}>
            <h2>{textFirstResult}</h2>
          </div>
          <div id={"divWithoutProduct"} className={classNameSecondResult}>
            <h2>{textSecondResult}</h2>
          </div>
        </div>
    );
}

export default SimulateResult;