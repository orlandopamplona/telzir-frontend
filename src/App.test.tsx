import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { environment } from "./common/environment"
import App from './App';


let container: any = null;


const backendURL = environment.apiServerUrl.url.concat(":", environment.apiServerPort.port.toString())

const localidadesFirstPage = {
    "_links": {
        "self": "/localidades",
        "next": "/localidades?_page=2"
    },
    "items": [
        {
            "_id": "5e56d546bbb50425806e7de4",
            "ddd": "011",
            "__v": 0
        },
        {
            "_id": "5e56d54bbbb50425806e7de5",
            "ddd": "016",
            "__v": 0
        }
    ]
}

const localidadesSecondPage = {
    "_links": {
        "self": "/localidades?_page=2",
        "previous": "/localidades?_page=1"
    },
    "items": [
        {
            "_id": "5e56d550bbb50425806e7de6",
            "ddd": "017",
            "__v": 0
        },
        {
            "_id": "5e56d554bbb50425806e7de7",
            "ddd": "018",
            "__v": 0
        }
    ]
}

const planosFirstPage = {
    "_links": {
        "self": "/planos",
        "next": "/planos?_page=2"
    },
    "items": [
        {
            "_id": "5e56d699bbb50425806e7de8",
            "origem": { "_id": "5e56d546bbb50425806e7de4", "ddd": "011", "__v": 0 },
            "destino": { "_id": "5e56d54bbbb50425806e7de5", "ddd": "016", "__v": 0 },
            "valor": 1.9,
            "__v": 0
        },
        {
            "_id": "5e56d6b4bbb50425806e7de9",
            "origem": { "_id": "5e56d54bbbb50425806e7de5", "ddd": "016", "__v": 0 },
            "destino": { "_id": "5e56d546bbb50425806e7de4", "ddd": "011", "__v": 0 },
            "valor": 2.9,
            "__v": 0
        }
    ]
}

const planosSecondPage = {
    "_links": {
        "self": "/planos?_page=2",
        "previous": "/planos?_page=1",
        "next": "/planos?_page=3"
    },
    "items": [
        {
            "_id": "5e56d6c4bbb50425806e7dea",
            "origem": { "_id": "5e56d546bbb50425806e7de4", "ddd": "011", "__v": 0 },
            "destino": { "_id": "5e56d550bbb50425806e7de6", "ddd": "017", "__v": 0 },
            "valor": 1.7,
            "__v": 0
        },
        {
            "_id": "5e56d6d9bbb50425806e7deb",
            "origem": { "_id": "5e56d550bbb50425806e7de6", "ddd": "017", "__v": 0 },
            "destino": { "_id": "5e56d546bbb50425806e7de4", "ddd": "011", "__v": 0 },
            "valor": 2.7,
            "__v": 0
        }
    ]
}


const planosThirdPage = {
    "_links": {
        "self": "/planos?_page=3",
        "previous": "/planos?_page=2"
    },
    "items": [
        {
            "_id": "5e56d6fdbbb50425806e7dec",
            "origem": { "_id": "5e56d546bbb50425806e7de4", "ddd": "011", "__v": 0 },
            "destino": { "_id": "5e56d554bbb50425806e7de7", "ddd": "018", "__v": 0 },
            "valor": 0.9,
            "__v": 0
        },
        {
            "_id": "5e56d709bbb50425806e7ded",
            "origem": { "_id": "5e56d554bbb50425806e7de7", "ddd": "018", "__v": 0 },
            "destino": { "_id": "5e56d546bbb50425806e7de4", "ddd": "011", "__v": 0 },
            "valor": 1.9,
            "__v": 0
        }
    ]
}

const produtosFirstPage = {
    "_links": {
        "self": "/produtos",
        "next": "/produtos?_page=2"
    },
    "items": [
        {
            "_id": "5e56d836bbb50425806e7dee",
            "descricao": "FaleMais 30",
            "minutos": 30,
            "acrescimo": 10,
            "__v": 0
        },
        {
            "_id": "5e56d849bbb50425806e7def",
            "descricao": "FaleMais 60",
            "minutos": 60,
            "acrescimo": 10,
            "__v": 0
        }
    ]
}

const produtosSecondPage = {
    "_links": {
        "self": "/produtos?_page=2",
        "previous": "/produtos?_page=1"
    },
    "items": [
        {
            "_id": "5e56d856bbb50425806e7df0",
            "descricao": "FaleMais 120",
            "minutos": 120,
            "acrescimo": 10,
            "__v": 0
        }
    ]
}

const localidadesByOrigem = [
    {
        "_id": "5e56d54bbbb50425806e7de5",
        "ddd": "016",
        "__v": 0
    },
    {
        "_id": "5e56d550bbb50425806e7de6",
        "ddd": "017",
        "__v": 0
    },
    {
        "_id": "5e56d554bbb50425806e7de7",
        "ddd": "018",
        "__v": 0
    }
]

const resultSimular = {
    "origem": "011",
    "destino": "017",
    "duracao": "40",
    "produto": "FaleMais 30",
    "comFaleMais": 18.700000000000003,
    "semFaleMais": 68
}

const defaultRoot = {}


beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

it("Render component App and execute simulation", async (done) => {

    window.HTMLElement.prototype.scrollIntoView = function() {};

    const mock = new MockAdapter(axios);

    mock.onGet("/").reply(200, defaultRoot);

    let originFirst = JSON.parse(JSON.stringify(localidadesFirstPage))
    mock.onGet(backendURL + "/localidades").reply(200, originFirst);
    mock.onGet(backendURL + "/localidades?_page=1").reply(200, originFirst);

    let originSecond = JSON.parse(JSON.stringify(localidadesSecondPage))
    mock.onGet(backendURL + "/localidades?_page=2").reply(200, originSecond);

    let localidadesOrigem = JSON.parse(JSON.stringify(localidadesByOrigem))
    mock.onGet(backendURL + "/localidades/byOrigem/5e56d546bbb50425806e7de4").reply(200, localidadesOrigem);

    let planosFirst = JSON.parse(JSON.stringify(planosFirstPage))
    mock.onGet(backendURL + "/planos").reply(200, planosFirst);
    mock.onGet(backendURL + "/planos?_page=1").reply(200, planosFirst);

    let planosSecond = JSON.parse(JSON.stringify(planosSecondPage))
    mock.onGet(backendURL + "/planos?_page=2").reply(200, planosSecond);

    let planosThird = JSON.parse(JSON.stringify(planosThirdPage))
    mock.onGet(backendURL + "/planos?_page=3").reply(200, planosThird);

    let produtosFirst = JSON.parse(JSON.stringify(produtosFirstPage))
    mock.onGet(backendURL + "/produtos").reply(200, produtosFirst);
    mock.onGet(backendURL + "/produtos?_page=1").reply(200, produtosFirst);

    let produtosSecond = JSON.parse(JSON.stringify(produtosSecondPage))
    mock.onGet(backendURL + "/produtos?_page=2").reply(200, produtosSecond);

    let simular = JSON.parse(JSON.stringify(resultSimular))
    mock.onGet(backendURL + "/produtos/simular/5e56d836bbb50425806e7dee/5e56d546bbb50425806e7de4/5e56d550bbb50425806e7de6/40").reply(200, simular);

    await act(async () => {
        render(<App />, container);
    });

    setTimeout(async () => {

        expect(container.textContent).toContain("SPEAKMORE PLANS!");

        const selectOrigin = container.querySelector("#cbDddOrigin")
        expect(selectOrigin.textContent).toContain("011")
        expect(selectOrigin.querySelectorAll("option")[1].getAttribute("value")).toEqual("5e56d546bbb50425806e7de4");
        expect(selectOrigin.querySelectorAll("option")[1].textContent).toEqual("011");
        selectOrigin.value = "5e56d546bbb50425806e7de4"
        ReactTestUtils.Simulate.change(selectOrigin, { target: { value: "5e56d546bbb50425806e7de4" } as any });
        await act(async () => { render(<App />, container); });

        const selectDestination = container.querySelector("#cbDddDestination")
        selectDestination.value = "5e56d550bbb50425806e7de6"
        ReactTestUtils.Simulate.change(selectDestination, { target: { value: "5e56d550bbb50425806e7de6" } as any });
        await act(async () => { render(<App />, container); });

        const selectCallTime = container.querySelector("#iptMinute")
        selectCallTime.value = 40
        ReactTestUtils.Simulate.change(selectCallTime, { target: { value: "40" } as any });
        await act(async () => { render(<App />, container); });

        const selectProduct = container.querySelector("#cbProduct")
        selectProduct.value = "5e56d836bbb50425806e7dee"
        ReactTestUtils.Simulate.change(selectProduct, { target: { value: "5e56d836bbb50425806e7dee" } as any });
        await act(async () => { render(<App />, container); });

        const buttonSimulate = container.querySelector("#btnSimulate")
        ReactTestUtils.Simulate.click(buttonSimulate);
        await act(async () => { render(<App />, container); });

        const simulateResultWithProduct = container.querySelector("#divWithProduct")
        expect(simulateResultWithProduct.textContent).toContain("With SpeakMore:------>  $18.70")
        const simulateResultWithoutProduct = container.querySelector("#divWithoutProduct")
        expect(simulateResultWithoutProduct.textContent).toContain("Without SpeakMore:------>  $68.00")

        done();
    }, 500);

});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});