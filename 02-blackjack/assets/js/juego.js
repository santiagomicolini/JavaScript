

let deck = [];
const tipos =['C', 'D', 'H', 'S']
const especiales =['A', 'J', 'Q', 'K']

let puntosJugador = 0;
    puntosComputadora = 0;

// referencias del html
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

const crearDeck = () => {

  for( let i = 2; i <= 10; i++) {
    for( let tipo of tipos) {
        deck.push( i + tipo);
      };
  };

  for( let tipo of tipos ) {
    for( let esp of especiales ) {
      deck.push( esp + tipo );
    };
  };

  deck = _.shuffle( deck );
  console.log(deck);
  return deck
};

crearDeck();

// Seleecionamos una carta del deck
const pedirCarta = () => {

  if (deck.length === 0 ) {
    throw 'No hay cartas en el deck';
  }

  const carta = deck.pop();
  return carta;
}

const valorCarta = ( carta ) => {

  const valor = carta.substring(0, carta.length - 1);
  // codigo reducido de lo que puse abajo
  return ( isNaN(valor) ) ?
          ( valor === 'A') ? 11 : 10
          : valor * 1;

  // let puntos = 0;
  // console.log({valor});
  // if( isNaN(valor) ) {
  //   puntos = ( valor === 'A') ? 11 : 10;
  // } else {
  //   puntos = valor * 1;
  // };
  //   console.log(puntos);
  };

// turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {

  // Utilizo do/while porq al menos tengo que ejecutar el código una vez.
  do {
    const carta = pedirCarta();
    puntosComputadora= puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    // creo la carta cuando hago click en nueva carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')

    // lo inserto en el html

    divCartasComputadora.append(imgCarta);

    if(puntosMinimos > 21) {
      break;
    }

  } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

}

  const valor = valorCarta( pedirCarta() );

  // eventos

  // esta funcion que se pone dentro de otra funcion se llama callback
  // una funcion que se coloca coomo argumento

  // tengo que hacer una referencia al elemento html que es el boton
  // en el html, asigno un ID para poder identificar cada boton de forma unica
  // pongo el elemento en una variable -- > al inicio
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // creo la carta cuando hago click en nueva carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')

    // lo inserto en el html

    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21) {
      btnPedir.disabled = true;
      turnoComputadora(puntosJugador);
    } else if ( puntosJugador === 21 ){
      btnPedir.disabled = true;
    }
  })
