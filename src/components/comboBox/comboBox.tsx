import React, { useState, useEffect } from 'react';


interface Props {
    id: string,
    className: string,
    classNameTitle: string,
    title: string,
    itensSelect: { id: string, name: string }[],
    changeFunction: any,
    placeHolder: string
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {any} classNameTitle Identifier of the css class used
 * @param {string} title Title displayed at the top of the component
 * @param {[id: string, name: string]} itensSelect List of items that will be presented in the component
 * @param {any} changeFunction Function that will be performed when choosing a component item
 * @param {string} placeHolder Previous text presented within the component
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters to be displayed,
 * composing an HTML element with them.
*/
function ComboBox({ id, className, classNameTitle, title, itensSelect, changeFunction, placeHolder }: Props) {

    const [itemSelect, setItemSelect] = useState([
        { id: '0', name: 'Initial' }
    ])

    useEffect( () => {
        setItemSelect(itensSelect);
    }, [itensSelect])

    return (
        <div className={className}>
            <div className={classNameTitle}>
                <h3>{title}</h3>
            </div>
            <select id={id} defaultValue={"DEFAULT"} onChange={changeFunction}>
                <option value="DEFAULT" key={"DEFAULT"} disabled>{placeHolder}</option>
                {itemSelect.map(item => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export default ComboBox;