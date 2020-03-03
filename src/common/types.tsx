
/**
 * @description Sets the type MessageDetail.
*/
export type MessageDetail = {
    id: string;
    description: string;
};

/**
 * @description Sets the type MessageLocale.
*/
export type MessageLocale = { 
    locale: string;
    detail: MessageDetail[];
};

/**
 * @description Sets the type LocaleParams.
*/
export type LocaleParams = {
    locale: string;
    currency: string
}