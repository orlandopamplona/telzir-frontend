import React from 'react';


interface Props {
    id: string,
    className: string,
    classNameInner: string,
    imgSrc: any,
    imgAlt: string,
    title: string,
    subTitle: string,
    text: string
}

/**
 * @param {string} id Unique component identifier
 * @param {string} className Identifier of the css class used
 * @param {string} classNameInner Identifier of the css class used
 * @param {any} imgSrc Image element that will illustrate the article
 * @param {string} imgAlt Text displayed when placing the mouse over the image element
 * @param {string} title Title of the article
 * @param {string} subTitle Article subtitle
 * @param {string} text Article text
 * @returns {HTMLElement} Assembled HTML element
 * @description It receives formatting parameters and texts to be displayed,
 * composing an HTML element with them.
*/
function Article({ id, className, classNameInner, imgSrc, imgAlt, title, subTitle, text }: Props) {

    return (
        <article id={id} className={className}>
          <a href="#"><img src={imgSrc} alt={imgAlt}></img></a>
          <div className={classNameInner}>
            <a href="#">{title}</a>
            <h4>{subTitle}</h4>
            <p>{text}</p>
          </div>
        </article>
    );
}

export default Article;