/*--------------------------*/
/*       RODOLFO PUC        */
/*--------------------------*/

//Color del Titulo
function colorTitulo(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'rgb(255,255,0)');//Blanco
			},
			queue: true
		})

		.delay(600) //Retardo entre cambio de color

		.animate({
			opacity: '0.7' //Opacidad del 70%
		}, {
			step: function () {
				$(this).css('color', 'rgb(255,255,255)');//Amarillo
				colorTitulo('.main-titulo');
			},
			queue: true
		}) ;
}
//Fin Color del Titulo



//Dulces aleatorios
function generarDulcesAleatorios() {
	return Math.floor(Math.random() * (4))+1;
}
//Fin de Dulces aleatorios



// Dulces en pantalla
function arreglodeDulces(arrayType, inicio) {

	var columna1 = $('.col-1').children();
	var columna2 = $('.col-2').children();
	var columna3 = $('.col-3').children();
	var columna4 = $('.col-4').children();
	var columna5 = $('.col-5').children();
	var columna6 = $('.col-6').children();
	var columna7 = $('.col-7').children();

	var columnastotales = $([columna1, columna2, columna3, columna4,
		columna5, columna6, columna7
	]);

	if (typeof inicio === 'number') {
		var arregloDulces = $([columna1.eq(inicio), columna2.eq(inicio), columna3.eq(inicio),
			columna4.eq(inicio), columna5.eq(inicio), columna6.eq(inicio),
			columna7.eq(inicio)
		]);
	} else {
		inicio = '';
	}

	if (arrayType === 'columnas') {
		return columnastotales;
	} else if (arrayType === 'rows' && inicio !== '') {
		return arregloDulces;
	}
}
//Fin de Dulces en pantalla



// Arreglo de filas
function filastotales(inicio) {
	var arregloDulces = arreglodeDulces('rows', inicio);
	return arregloDulces;
}
//Fin Arreglo de filas



// Arreglo de colunmnas
function columnastotales(inicio) {
	var columnaDulces = arreglodeDulces('columnas');
	return columnaDulces[inicio];
}
//Fin Arreglo de colunmnas



//Eliminacion de Dulces
function validacionBorrar() {
	for (var cv = 0; cv < 7; cv++) {
		var contador = 0;
		var posicionDulces = [];
		var posicionLibre = [];
		var columnaDulces = columnastotales(cv);
		var comparacion = columnaDulces.eq(0);
		var bandera = false;

		for (var i = 1; i < columnaDulces.length; i++) {
			var srcComparacion = comparacion.attr('src');
			var srcDulces = columnaDulces.eq(i).attr('src');

			if (srcComparacion != srcDulces) {
				if (posicionDulces.length >= 3) {
					bandera = true;
				} else {
					posicionDulces = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!bandera) {
						posicionDulces.push(i - 1);
					} else {
						posicionLibre.push(i - 1);
					}
				}
				if (!bandera) {
					posicionDulces.push(i);
				} else {
					posicionLibre.push(i);
				}
				contador += 1;
			}
			comparacion = columnaDulces.eq(i);
		}
		if (posicionLibre.length > 1) {
			posicionDulces = $.merge(posicionDulces, posicionLibre);
		}
		if (posicionDulces.length <= 1) {
			posicionDulces = [];
		}
		contadorDulcesx3 = posicionDulces.length;
		if (contadorDulcesx3 >= 3) {
			borrarDulces(posicionDulces, columnaDulces);
			contadorPuntos(contadorDulcesx3);
		}
	}
}

function borrarDulces(posicionDulces, columnaDulces) {
	for (var i = 0; i < posicionDulces.length; i++) {
		columnaDulces.eq(posicionDulces[i]).addClass('delete');
	}
}


function arregloValidacionBorrar() {
	for (var cv = 0; cv < 6; cv++) {
		var contador = 0;
		var posicionDulces = [];
		var posicionLibre = [];
		var arregloDulces = filastotales(cv);
		var comparacion = arregloDulces[0];
		var bandera = false;
		for (var i = 1; i < arregloDulces.length; i++) {
			var srcComparacion = comparacion.attr('src');
			var srcDulces = arregloDulces[i].attr('src');

			if (srcComparacion != srcDulces) {
				if (posicionDulces.length >= 3) {
					bandera = true;
				} else {
					posicionDulces = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!bandera) {
						posicionDulces.push(i - 1);
					} else {
						posicionLibre.push(i - 1);
					}
				}
				if (!bandera) {
					posicionDulces.push(i);
				} else {
					posicionLibre.push(i);
				}
				contador += 1;
			}
			comparacion = arregloDulces[i];
		}
		if (posicionLibre.length > 2) {
			posicionDulces = $.merge(posicionDulces, posicionLibre);
		}
		if (posicionDulces.length <= 2) {
			posicionDulces = [];
		}
		contadorDulcesx3 = posicionDulces.length;
		if (contadorDulcesx3 >= 3) {
			borrarLineaX(posicionDulces, arregloDulces);
			contadorPuntos(contadorDulcesx3);
		}
	}
}


function borrarLineaX(posicionDulces, arregloDulces) {
	for (var i = 0; i < posicionDulces.length; i++) {
		arregloDulces[posicionDulces[i]].addClass('delete');
	}
}
//Fin Eliminacion de Dulces



//Puntuacion
function contadorPuntos(contadorDulcesx3) {
	var puntos = Number($('#score-text').text());
	switch (contadorDulcesx3) {
		case 3:
			puntos += 25;
			break;
		case 4:
			puntos += 50;
			break;
		case 5:
			puntos += 75;
			break;
		case 6:
			puntos += 100;
			break;
		case 7:
			puntos += 200;
	}
	$('#score-text').text(puntos);
}
//Fin Puntuacion



//Dulces Aleatorios
function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var valorFilas = 7; //Total de Filas
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulcess = $(this).children().length;
		var agrega = valorFilas - dulcess;
		for (var i = 0; i < agrega; i++) {
			var tipoDulce = generarDulcesAleatorios();
			if (i === 0 && dulcess < 1) {
				$(this).append('<img src="image/' + tipoDulce + '.png" class="element" width="96px"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + tipoDulce + '.png" class="element" width="96px"></img>');
			}
		}
	});
	draganddropDulces();
	validacionBorrarDulces();
}
//Fin Dulces Aleatorios



//Borrado de Dulces
function validacionBorrarDulces() {
	validacionBorrar();
	arregloValidacionBorrar();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		animacionBorrarDulces();
	}
}
//Fin Borrado de Dulces



//Drag and Drop Movimientos
function draganddropDulces() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 400,
		grid: [100, 100],
		zinicio: 10,
		drag: dulcesDrag
	});
	$('img').droppable({
		drop: cambioPosicionDulces
	});
	activarEventosDulces();
}


function desactivarEventosDulces() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}


function activarEventosDulces() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}


function dulcesDrag(event, dulcesDrag) {
	dulcesDrag.position.valorFilas = Math.min(100, dulcesDrag.position.valorFilas);
	dulcesDrag.position.bottom = Math.min(100, dulcesDrag.position.bottom);
	dulcesDrag.position.left = Math.min(100, dulcesDrag.position.left);
	dulcesDrag.position.right = Math.min(100, dulcesDrag.position.right);
}
//Fin Drag and Drop Movimientos



//Cambio Posicion de Dulces
function cambioPosicionDulces(event, dulcesDrag) {
	var dulcesDrag = $(dulcesDrag.draggable);
	var dragSrc = dulcesDrag.attr('src');
	var dulcesDrop = $(this);
	var dropSrc = dulcesDrop.attr('src');
	dulcesDrag.attr('src', dropSrc);
	dulcesDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			dulcesDrag.attr('src', dragSrc);
			dulcesDrop.attr('src', dropSrc);
		} else {
			actualizarMovimientos();
		}
	}, 500);

}


function comprobarMovimiento(movimientos) {
	if (movimientos) {
		checkBoard();
	}
}



function actualizarMovimientos() {
	var puntacionActual = Number($('#movimientos-text').text());
	var movimientos = puntacionActual += 1;
	$('#movimientos-text').text(movimientos);
}
//Fin Cambio Posicion de Dulces



//Animacion de Borrado de Dulces
function animacionBorrarDulces() {
	desactivarEventosDulces();
	$('img.delete').effect('pulsate', 800);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				borradoDulces()
					.then(comprobarMovimiento)
					.catch(showPromiseError);
			},
			queue: true
		});
}
//Fin Animacion de Borrado de Dulces



function borradoDulces() {
	return new Promise(function (resolve, recvect) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			recvect('Error...');
		}
	})
}



//Boton reiniciar
function findelJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}

// Inicio del Juego
function IniciarJuego() {

	colorTitulo('.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: findelJuego
		})
	});
}

// Carga el DOM del Juego
$(function() {
	IniciarJuego();
});

