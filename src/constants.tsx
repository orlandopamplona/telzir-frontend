import React from "react";
import { environment } from "./common/environment"
import * as utils from './common/utils'

/**
 * @description Defines the textual description of the items that will be displayed in the menu.
*/
export const itemsMenu = [
    { id: 1, name: utils.translate("menuHome") },
    { id: 2, name: utils.translate("menuCustomer") },
    { id: 3, name: utils.translate("menuServices") },
    { id: 4, name: utils.translate("menuBlog") },
    { id: 5, name: utils.translate("menuWhoWeAre") },
    { id: 6, name: utils.translate("menuContact") }
  ]
  
/**
 * @description Defines the social media links displayed in the footer.
*/
export const socialMedia = 
  <div>
    <a href="https://www.facebook.com/VizirSoftwareStudio"><i className="fa fa-facebook"></i></a>
    <a href="https://twitter.com/myvizir"><i className="fa fa-twitter"></i></a>
    <a href="https://github.com/Vizir"><i className="fa fa-github"></i></a>
    <a href="https://www.linkedin.com/company/1151827"><i className="fa fa-linkedin"></i></a>
    <a href="https://www.youtube.com/channel/UCoJlmD3SjP2d6pIgSjfGtdA"><i className="fa fa-youtube"></i></a>
  </div>

/**
 * @description Defines a search query url identified by localidades/byOrigem.
*/
export const queryDestinationByOrigin = "localidades/byOrigem"

/**
 * @description Defines a search query url identified by produtos/simular.
*/
export const queryCalculateSimulation = "produtos/simular"

/**
 * @description Defines a search query url identified by localidades.
*/
export const queryDestination = "localidades"

/**
 * @description Defines a search query url identified by produtos.
*/
export const queryProducts = "produtos"

/**
 * @description Defines the main API query url.
*/
export const API = environment.apiServerUrl.url.concat(":", environment.apiServerPort.port.toString())

/**
 * @description Defines search url query identified by the pagination in the search.
*/
export const page = "?_page="