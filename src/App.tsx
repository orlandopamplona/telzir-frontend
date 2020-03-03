import React, { useState, useEffect } from "react";
import axios from "axios";

import imgTelecomDay from "./img/telecomDay.jpg";
import imgCelPhone from "./img/celphone.jpg";
import imgAntena from "./img/antena.jpg";
import Button from "./components/button/button"
import Menu from "./components/menu/menu"
import ComboBox from "./components/comboBox/comboBox"
import Input from "./components/input/input"
import Article from "./components/article/article"
import FooterSocialMedia from "./components/footer/socialMedia/footerSocialMedia"
import SimulateResult from "./components/simulateResult/simulateResult"
import Alert from "./components/alert/alert"
import * as constant from "./constants"
import * as utils from "./common/utils"
import "./App.css";

import log from "loglevel";

/**
* @description Main component.
*/
function App() {

  const initialSimulation = {
    "origem": "",
    "destino": "",
    "duracao": "",
    "produto": "",
    "comFaleMais": undefined,
    "semFaleMais": undefined
  }

  const [query, setQuery] = useState(constant.queryDestination)
  const QUERYS = [constant.queryProducts];
  const API_URI = `${constant.API}/${query}${constant.page}`

  const [showMenuOption, setShowMenuOption] = useState(
    { visible: false }
  )

  const [showAlert, setShowAlert] = useState(
    { visible: false }
  )

  const [itemsDddOrigin, setItemsDddOrigin] = useState(
    [{ id: "0", name: "DDD" }]
  )

  const [itemsDddDestination, setItemsDddDestination] = useState(
    [{ id: "0", name: "DDD" }]
  )

  const [products, setProducts] = useState(
    [{ id: "0", name: "" }]
  )

  const [simulation, setSimulation] = useState(
    initialSimulation
  )

  useEffect(() => {
    setShowMenuOption({ visible: false })
  }, [])

  useEffect(() => {
    setShowAlert({ visible: false })
  }, [])


  useEffect(() => {
    QUERYS.forEach(queryToExecute => {
      changeQuery(queryToExecute)
    })
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      executeFetch(query)
    }
  }, [query]);

  /**
    * @param {string} queryName Query parameter according to the items to be consulted.
    * @description Receives the query parameter and sets it to the control object.
   */
  const changeQuery = async (queryName: string) => {
    await setQuery(queryName)
  }

  /**
    * @param {React.SetStateAction} event Event captured on component's onChange execution.
    * @description Triggers the consultation of destinations according to the informed source.
   */
  const onSelectOrigin = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
    changeQuery(constant.queryDestinationByOrigin)
    const url = `${constant.API}/${constant.queryDestinationByOrigin}/${event.target.value}`
    executeFetch(constant.queryDestinationByOrigin, url)
  }

  /**
   * @param {any} partial Displays the data collection up to the current page.
   * @param {number} offsetLocal Indicates the next page to be fetched.
   * @description Searches for data corresponding to Destination locations.
  */
  const fetchDestination = async (partial: any, offsetLocal: number) => {
    try {
      await axios.get(API_URI.concat(offsetLocal.toString()))
        .then(response => {
          offsetLocal++
          let fullData = partial
          fullData = fullData.concat(response.data.items)
          if (response && response.data._links.next) {
            fetchDestination(fullData, offsetLocal)
          }
          const result = fullData.map((item: { _id: any; ddd: any; }) => {
            return { id: item._id, name: item.ddd }
          })
          setItemsDddOrigin(result)
        })
    } catch (err) {
      log.error(err)
    }
  }

  /**
   * @param {string} url Destination location query url according to the selected source.
   * @description Searches for destination locations according to the previously selected source.
  */
  const fetchDestinationTarget = async (url: string) => {
    try {
      await axios.get(url)
        .then(response => {
          if (response && response.data.length > 0) {
            const result = response.data.map((item: { _id: any; ddd: any; }) => {
              return { id: item._id, name: item.ddd }
            })
            setItemsDddDestination(result)
          }
        })
    } catch (err) {
      log.error(err)
    }
  }

  /**
   * @param {string} url Displays the URL of the service that performs the simulation calculation.
   * @description Search the simulation values according to the selected options.
  */
  const fetchSimulacao = async (url: string) => {
    try {
      await axios.get(url)
        .then(response => {
          if (response && response.data.origem) {
            setSimulation(response.data)
            const elementResult = document.getElementById("divResult")
            if (elementResult) {
              elementResult.scrollIntoView();
            }
          }
        })
    } catch (err) {
      log.error(err)
    }
  }

  /**
   * @param {any} partial Displays the data collection up to the current page
   * @param {number} offsetLocal Indicates the next page to be fetched
   * @description Searches for data corresponding to Products.
  */
  const fetchProducts = async (partial: any, offsetLocal: number) => {
    try {
      axios.get(API_URI.concat(offsetLocal.toString()))
        .then(response => {
          offsetLocal++
          let fullData = partial
          fullData = fullData.concat(response.data.items)
          if (response && response.data._links.next) {
            fetchProducts(fullData, offsetLocal)
          }
          const result = fullData.map((item: { _id: any; descricao: any; }) => {
            return { id: item._id, name: item.descricao }
          })
          setProducts(result)
        })
    } catch (err) {
      log.error(err)
    }
  }

  /**
   * @param {string} query Indicates the query to be performed (Products, Destination, etc.)
   * @param {string} url In the case of specific queries that do not follow the standard,
   * inform the url that should be used.
   * @description Generic function that performs the routing according to the requested query.
  */
  const executeFetch = async (query: string, url: string = "") => {
    if (query) {
      const fetching = [
        { queryName: constant.queryDestination, fetchFunction: () => fetchDestination([], 1) },
        { queryName: constant.queryProducts, fetchFunction: () => fetchProducts([], 1) },
        { queryName: constant.queryDestinationByOrigin, fetchFunction: () => fetchDestinationTarget(url) },
        { queryName: constant.queryCalculateSimulation, fetchFunction: () => fetchSimulacao(url) }
      ]
      const fetchQuery = fetching.filter((name) => {
        return name.queryName === query
      })
      return fetchQuery && fetchQuery.length > 0 ? fetchQuery[0].fetchFunction() : undefined
    }
  }

  /**
    * @description Search the values chosen by the user to be used in the simulation.
   */
  const simulate = () => {
    changeShowAlert(false)
    let validSubmit: boolean[] = []
    changeQuery(constant.queryCalculateSimulation)
    const selectProduct: any = document.getElementById("cbProduct")
    let productSelected: any
    if (selectProduct) {
      productSelected = selectProduct.options[selectProduct.selectedIndex].value
      validSubmit.push(validSubmitSimulate(productSelected))
    }
    const selectOrigin: any = document.getElementById("cbDddOrigin")
    let originSelected: any
    if (selectOrigin) {
      originSelected = selectOrigin.options[selectOrigin.selectedIndex].value
      validSubmit.push(validSubmitSimulate(originSelected))
    }
    const selectDestination: any = document.getElementById("cbDddDestination")
    let destinationSelected: any
    if (selectDestination) {
      destinationSelected = selectDestination.options[selectDestination.selectedIndex].value
      validSubmit.push(validSubmitSimulate(destinationSelected))
    }

    const callTime: any = document.getElementById("iptMinute")
    let callTimeReported: any
    if (callTime) {
      callTimeReported = callTime.value
      validSubmit.push(validSubmitSimulate(callTimeReported))
    }

    if (validSubmit.indexOf(false) === -1) {     
      const url = `${constant.API}/${constant.queryCalculateSimulation}/${productSelected}/${originSelected}/${destinationSelected}/${callTimeReported}`
      executeFetch(constant.queryCalculateSimulation, url)
    } else {
      setSimulation(initialSimulation)
      log.error(utils.translate("requiredFields"))
      changeShowAlert(true)
    }
    
  }

  const validSubmitSimulate = (fieldValue: string): boolean => {
    return fieldValue !== "DEFAULT" && fieldValue !== "DDD" && fieldValue !== "" && fieldValue !== "0"
  }

  const closeShowMenu = (isVisible: boolean) => {
    setShowMenuOption({ visible: isVisible });
  }

  const changeShowAlert = (isVisible: boolean) => {
    setShowAlert({ visible: isVisible });
  }


  return (
    <div id="mainApp" data-testid="mainApp" className="App">
      {/* HEADER */}
      <header className="cabecalho container">
        <a href="index.html"><h1 className="logo"> {utils.translate("textTitle")} </h1></a>
        <Button id="btnMenu" className="btn-menu bg-gradient" click={() => closeShowMenu(true)}><i className="fa fa-bars fa-lg"></i></Button>
        <Menu id="menu" classNameNav="menu" click={() => closeShowMenu(false)} classNameClose="btn-close" itensMenu={constant.itemsMenu} visible={showMenuOption.visible}><i className="fa fa-times"></i></Menu>
      </header>
      {/* BANNER */}
      <div className="banner container">
        <div className="title">
          <h2>{utils.translate("bannerTitle")}</h2>
          <h3>{utils.translate("bannerSubTitle")}</h3>
        </div>
        <div className="buttons">
          <Button id="btnRegister" click={undefined} className="btn btn-cadastrar bg-white radius">{utils.translate("bannerBtnContract")} <i className="fa fa-arrow-circle-right"></i></Button>
          <Button id="btnAbout" click={undefined} className="btn btn-sobre bg-black radius">{utils.translate("bannerBtnInformation")} <i className="fa fa-question-circle"></i></Button>
        </div>
      </div>
      {/* FALEMAIS */}
      <div className="falemais container bg-gradient">
        <h2>{utils.translate("simulateTitle")}</h2>
        <div className="innerSelect" id="divResult">
          <ComboBox id="cbDddOrigin" className="innerSelectOrigem" classNameTitle="titleSelect" title={utils.translate("simulateTitleOrigin")} placeHolder={utils.translate("simulatePlaceHolderOrigin")} itensSelect={itemsDddOrigin} changeFunction={onSelectOrigin}></ComboBox>
          <ComboBox id="cbDddDestination" className="innerSelectDestino" classNameTitle="titleSelect" title={utils.translate("simulateTitleDestination")} placeHolder={utils.translate("simulatePlaceHolderDestination")} itensSelect={itemsDddDestination} changeFunction={undefined}></ComboBox>
          <Input id="iptMinute" className="innerSelectTempo" classNameTitle="titleSelect" title={utils.translate("simulateTitleCallTime")} placeholder={utils.translate("simulatePlaceHolderCallTime")} classNameInput="bg-white radius" type="number" min={1}></Input>
          <ComboBox id="cbProduct" className="innerSelectProduto" classNameTitle="titleSelect" title={utils.translate("simulateTitleProduct")} placeHolder={utils.translate("simulatePlaceHolderProduct")} itensSelect={products} changeFunction={undefined}></ComboBox>
          <div className="innerSelectButton">
            <Button id="btnSimulate" className="bg-black radius" click={() => simulate()}>{utils.translate("simulateButtonSimulate")}</Button>
          </div>
        </div>
        <Alert id="alertRequiredFieldss" className={showAlert.visible ? "alert" : "alertDisabled"} classNameInner="closebtn" text={utils.translate("requiredFields")} click={() => changeShowAlert(false)}></Alert>
        {simulation.semFaleMais && <SimulateResult id="smFaleMais"
          className="resultados bg-blue radius"
          classNameFirstResult="resultado"
          textFirstResult={`${utils.translate("simulateResultWithSpeakMore")} ${utils.formatarCurrency(simulation.comFaleMais, utils.localeParams[0])}`}
          classNameSecondResult="resultado"
          textSecondResult={`${utils.translate("simulateResultWithoutSpeakMore")} ${utils.formatarCurrency(simulation.semFaleMais, utils.localeParams[0])}`}
        ></SimulateResult>
        }
      </div>
      {/* SERVICES */}
      <main className="servicos container">
        <Article id="artWorldTelecom"
          className="servico bg-white radius"
          classNameInner="inner"
          imgSrc={imgTelecomDay}
          imgAlt="World Telecommunication Day"
          title="World Telecommunication Day"
          subTitle="Celebrated on 17 May"
          text="World Telecommunication Day has been celebrated annually on 17 May since 1969, marking the founding of ITU and the signing of the first International Telegraph Convention in 1865. It was instituted by the Plenipotentiary Conference in Malaga-Torremolinos in 1973."
        ></Article>
        <Article id="artCelPlan"
          className="servico bg-white radius"
          classNameInner="inner"
          imgSrc={imgCelPhone}
          imgAlt="Planos para celular"
          title="Planos para celular"
          subTitle="Ampliação de planos"
          text="Telzir passar a operar também na área de telefonia celular, realizando grande evento de lançamento mundial em São Paulo."
        ></Article>
        <Article id="artNetCoverate"
          className="servico bg-white radius"
          classNameInner="inner"
          imgSrc={imgAntena}
          imgAlt="Cobertura de rede Telzir"
          title="Cobertura de rede Telzir"
          subTitle="Rede ampliada"
          text="Investimentos significativos estão sendo realizados na ampliação da rede de atendimento Telzir, possibilitando a partir do segundo trimestre ligações de qualquer parte do país."
        ></Article>
      </main>
      {/* NEWSLETTER */}
      <section className="newsletter container bg-black">
        <h2>{utils.translate("newsTitleRegister")}</h2>
        <h3>{utils.translate("newsSubTitleRegister")}</h3>
        <Input id="iptMail" className="" classNameTitle="" title="" classNameInput="bg-black radius" type="email" placeholder={utils.translate("newsPlaceHolderRegister")} min={0}></Input>
        <Button id="btnRegisterNews" className="bg-white radius" click={undefined}>{utils.translate("newsButtonRegister")}</Button>
      </section>
      {/* FOOTER */}
      <FooterSocialMedia id="ftSocialMedia"
        className="rodape container bg-gradient"
        classNameItens="social-icons"
        classNameCopyRight="copyright"
        textCopyright={utils.translate("socialMediaTitle")}
      >{constant.socialMedia}</FooterSocialMedia>
    </div>
  );
}

export default App;
