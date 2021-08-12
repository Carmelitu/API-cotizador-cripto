// Variables
const criptoSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    cripto: ''
}

// Crear Promise
const obtenerCripto = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCripto();

    formulario.addEventListener('submit', verificarFormulario);
    criptoSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);

});


function consultarCripto(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCripto(resultado.Data))
        .then(criptomonedas => selectCripto(criptomonedas))
}

function selectCripto(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptoSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
}

function verificarFormulario(e){
    e.preventDefault();
    console.log(objBusqueda);

    const {moneda, cripto} = objBusqueda;

    if (moneda === '' || cripto === ''){
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

}

function mostrarAlerta(mensaje){

    const existeError = document.querySelector('.error');
    if(!existeError){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}
    
