const apiBCB = require("./api-bcb");
const axios = require("axios");

jest.mock("axios"); // objeto mock do axios

//teste 01
test("getCotacaoApi", ()=>{
    const res = {
        data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        }
    }
    axios.get.mockResolvedValue(res) //retorna a chamada a partir do axios 'mockado'
    apiBCB.getCotacaoApi('url').then(resp=>{
        expect(resp).toEqual(res);
        expect(axios.get.mock.calls[0][0]).toBe('url');
    })

})
//teste 02
test("extractCotacao", ()=>{
    const cotacao = apiBCB.extractCotacao(res = {
        data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        }
    })
    expect(cotacao).toBe(3.90);
});

//teste 3
describe("getToday", ()=>{
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date);
            }
        }
    }

    afterEach(()=>{
        global.Date = RealDate;
    });

    test("getToday", ()=>{

        mockDate("2019-01-01T12:00:00z");
        const today = apiBCB.getToday();
        expect(today).toBe("1-1-2019");

    });
});

//teste 4

test("getUrl", ()=>{

    const url = apiBCB.getUrl("Teste4");
    expect(url).toBe(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27Teste4%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`);
});

test("getCotacao", ()=>{

})

//teste 5
test("getCotacao", ()=>{
    const res = {
        data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        }
    }

    const getToday = jest.fn();
    getToday.mockReturnValue("01-01-2019");

    const getUrl = jest.fn();
    getUrl.mockReturnValue("url");

    const getCotacaoApi = jest.fn();
    getCotacaoApi.mockResolvedValue(res);

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(3.90);

    apiBCB.pure.getCotacao({getToday, getUrl, getCotacaoApi, extractCotacao})().then(res=>{
        expect(res).toBe(3.90);
    })

});

//teste de exceção

test("getCotacao", ()=>{
    const res = {
        /*data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        } */
    }

    const getToday = jest.fn();
    getToday.mockReturnValue("01-01-2019");

    const getUrl = jest.fn();
    getUrl.mockReturnValue("url");

    const getCotacaoApi = jest.fn();
    getCotacaoApi.mockReturnValue(Promise.reject("err"));

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(3.90);

    apiBCB.pure.getCotacao({getToday, getUrl, getCotacaoApi, extractCotacao})().then(res=>{
        expect(res).toBe("");
    })

});