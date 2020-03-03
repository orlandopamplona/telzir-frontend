import React from 'react';


interface Props {
    id: string,
    className: string,
    classNameTitle: string,
    classNameInput: string,
    placeholder: string,
    type: string,
    min: number,
    title: string
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {string} classNameTitle Identifier of the css class used
 * @param {string} classNameInput Identifier of the css class used
 * @param {string} placeholder Text that will be previously displayed in the component
 * @param {string} type Type of the input element that will be considered (mail, number, etc.)
 * @param {number} min In the case of type number, it identifies the minimum value accepted in the field
 * @param {string} title Text that will be displayed at the top of the component
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters to be displayed,
 * composing an HTML element with them.
*/
function Input({ id, className, classNameTitle, classNameInput, placeholder, type, min, title }: Props) {

    const inputFull = <div className={className}>
        <div className={classNameTitle}>
            <h3>{title}</h3>
        </div>
        <input id={id} className={classNameInput} type={type} name={id} placeholder={placeholder} min={min}></input>
    </div>

    const inputSimple = <input id={id} className={classNameInput} type={type} name={id} placeholder={placeholder} min={min}></input>

    return (
        className ? inputFull : inputSimple
    );
}

export default Input;