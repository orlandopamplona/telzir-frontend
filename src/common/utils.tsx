import { MessageLocale, MessageDetail, LocaleParams } from "./types"
import messages from "./messages"

/**
 * @description It includes the two supported languages.
*/
export const locale = [
    {locale: "pt-BR", currency: "BRL"},
    {locale: "en-US", currency: "USD"}
]

/**
 * @param {string} actualLocale Locale captured from the environment in which the application is running
 * @returns {string} Locale default (pt-BR) or the locale itself informed
 * @description Receives the value of the locale captured from the environment in which the application
 * is running, if it is invalid, returns the default locale pt-BR.
*/
export const getLocale = (actualLocale: string): string => {
    return ((actualLocale) ? actualLocale : "pt-BR")
}

/**
 * @param {number} value Value that will be formatted according to the current language.
 * @param {LocaleParams} localeParams Parameters with the information of the current
 * location for formatting the currency according to the corresponding country.
 * @returns {string} Formatted currency value
 * @description It receives a value and formats it in currency according to the
 * definition of the location of the Browser.
*/
export const formatarCurrency = (value: number = 0, localeParams: LocaleParams): string => {
    return value.toLocaleString(localeParams.locale, { style: "currency", currency: localeParams.currency })
  }

/**
 * @description Captures the language corresponding to the user"s browser.
*/
export const localeBrowser: string = navigator.language

/**
 * @description Filters the currency formatting parameters according to the current language.
*/
export const localeParams: LocaleParams[] = locale.filter(localeParam => localeParam.locale === localeBrowser)

/**
 * @description Filters the list of translated terms according to the current language.
*/
export const messagesByLocale: MessageLocale[] = messages.filter(message => message.locale === getLocale(localeBrowser))

/**
 * @description Select the block of terms in the corresponding language.
*/
export const messagesDetail: MessageDetail[] = messagesByLocale[0].detail

/**
 * @param {string} id Search element identifier in the internationalization relationship
 * @returns {string} Term with translation found
 * @description Receives an element to search for in the internationalization list and
 * returns the term found in the corresponding language.
*/
export const translate = (id: string): string => {
    const detail: MessageDetail[] = messagesDetail.filter( detail => detail.id === id)
    return detail && detail[0] ? detail[0].description : "Not found"
}
