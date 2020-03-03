import React, { useState, useEffect } from 'react';


interface Props {
    id: string,
    classNameNav: string,
    classNameClose: string,
    itensMenu: { id: number, name: string }[],
    visible: boolean,
    click: any,
    children: any
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {string} classNameClose Identifier of the css class used
 * @param {[id: number, name: string]} itensMenu Represents the list of items that will
 * be presented in the component
 * @param {boolean} visible Element that classifies the menu to be displayed or not
 * @param {any} click Function that will be executed when clicking on the element
 * @param {any} children Element that will be inserted into the component
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters to be displayed,
 * composing an HTML element with them.
*/
function Menu({ id, classNameNav, classNameClose, itensMenu, visible, click, children }: Props) {

    const enabled = {
        display: "block"
    }

    const disabled = {
        display: "none"
    }

    const [itemMenu, setItemMenu] = useState([
        { id: 0, name: "Initial" }
    ])

    useEffect(() => {
        setItemMenu(itensMenu);

    }, [])

    return (
        <nav id={id} className={classNameNav} style={visible ? enabled : disabled}>
            <a className={classNameClose} onClick={click}>{children}</a>
            <ul>
                {itemMenu.map(item => (
                    <li key={item.id}><a href="#">{item.name}</a></li>
                ))}
            </ul>
        </nav>
    );
}

export default Menu;