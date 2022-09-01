//modulo de calculos

const convert = (cotacao, quantidade) =>{
    return cotacao * quantidade;
}

const toMoney = value=>{
    return parseFloat(value).toFixed(2); //dois digitos depois da virgula 
}

module.exports = {
    convert,
    toMoney
}