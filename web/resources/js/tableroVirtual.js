

///FUNCIONES PARA INICIALIZAR VALORES DEL LIENZO:
var canvasVelocimetro = document.getElementById("canvasVelocimetro");
var canvasTacometro = document.getElementById("canvasTacometro");
var canvasGasolina = document.getElementById("canvasGasolina");
var canvasTemperatura = document.getElementById("canvasTemperatura");

var ctx = canvasVelocimetro.getContext("2d");
var ctxA = canvasTacometro.getContext("2d");
var ctxG = canvasGasolina.getContext("2d");
var ctxT = canvasTemperatura.getContext("2d");

var color = '#63B4F5';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//VALORES PARA ANIMACIÓN DE VELOCIDAD:
var masVelocidad = 1;
var velocidad = 0;

var incremento = 7.5;
var velocidadRad;
var factorIncremento = 0.004;
var inicioRadianes = 7.5;
var finRadianes = 17.5;

var maximaVelocidad = 180;
var incrementoVelocimetro = 20;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//VALORES PARA ANIMACIÓN DE TACÓMETRO:
var acelerar = 1;
var rpm = 0;

var incrementoT = 8.75;
var aceleracionRad;
var factorIncrementoT = 0.015;
var inicioRadianesT = 8.75;
var finRadianesT = 17.5;

var maximaRpm = 8;
var incrementoRpm = 1;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//VALORES PARA ANIMACIÓN DE NIVEL DE GASOLINA:
var aumentarGas = 1;
var nivelGas = 0;

var incrementoGas = 17.5;
var nivelGasRad;
var factorIncrementoGas = 0.015;
var inicioRadianesGas = 17.5;
var finRadianesGas = 22.5;

var maximoGas = 11;
var incrementoNivelGas = 1;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//VALORES PARA ANIMACIÓN DE NIVEL DE GASOLINA:
var aumentarTem = 1;
var nivelTem = 0;

var incrementoTem = 7.5;
var nivelTemRad;
var factorIncrementoTem = 0.015;
var inicioRadianesTem = 7.5;
var finRadianesTem = 12.5;

var maximoTem = 11;
var incrementoNivelTem = 1;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///VALORES PARA EL DIÁMETRO DEL RELOJ DEL TACÓMETRO Y VELOCÍMETRO:
var radioReloj = 70;
var radioIntervalos = 14.3;

var origenRelojX = 2;
var origenRelojY = 2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//VALORES PARA GRADIENTE ANIMACIÓN:
var red, green, blue;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///VALORES PARA GUARDAR COORDENADAS TRANSFORMADAS:
var pixelX, pixelY;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///VALORES DEL PLANO CARTECIANO Y DE LA PANTALLA DE LA PC:
var x1, x2, y1, y2;
var sx1, sx2, sy1, sy2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA INICIAR ANIMACIÓN DE VELOCIDAD:
function empezarAcelerar() {
    acelerar = 1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA INICIAR ANIMACIÓN DE VELOCIDAD:
function empezarVelocidad() {
    masVelocidad = 1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA INICIAR ANIMACIÓN DE VELOCIDAD:
function aumentarNivelGasolina() {
    aumentarGas = 1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA INICIAR ANIMACIÓN DE VELOCIDAD:
function aumentarNivelTemperatura() {
    aumentarTem = 1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCION PARA LLAMAR A LAS FUNCIONES DE ACELERACION Y VELOCIDAD:
function mostrarActividadAuto() {
    if (acelerar != 0) {
        mostrarAceleracion();
    }
    if (masVelocidad != 0) {
        mostrarVelocidad();
    }
    if (aumentarTem != 0) {
        mostrarNivelTemperatura();
    }
    if (aumentarGas != 0) {
        mostrarNivelGasolina();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///VALORES PARA ANIMACION DE NIVEL DE TEMPERATURA Y NIVEL DE GASOLINA:
var x0 = 0, y0 = 10, xf = 0, yf = -10;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIONES PARA MOSTRAR EL NIVEL DE GASOLINA:
var tTem;
var dtTem = 1 / (maximoTem - 1);
var ttTem = 0
var dttTem = 0.007;
var nivelTemAnimacion = 0;

function mostrarNivelTemperatura() {
    var x, y;

    var contadorNivelTem = 0;

    tTem = 0;
    if (ttTem >= 1 || ttTem == 0) {
        estiloLienzo(4);
        ttTem = 0;

        if (nivelTemAnimacion == maximoTem - (incrementoNivelTem * Math.round(maximoTem / 2))) {
            aumentarTem = 2;
            dttTem = 0.05;
        } else if (nivelTemAnimacion < 0) {
            aumentarTem = 1;
            dttTem = 0.007;
            ttTem = 0.7;
        }

        do {
            x = (xf - x0) * tTem + x0;
            y = (yf - y0) * tTem + y0;

            ctxT.beginPath();
            Pantalla(x + 5, y);
            ctxT.moveTo(pixelX, pixelY);
            Pantalla(x - 5, y);

            if (contadorNivelTem <= nivelTemAnimacion) {
                //estiloDibujo('#F86161', 6, 6, ctxT)
                estiloDibujo('#63B4F5', 6, 6, ctxT)
            } else {
                //estiloDibujo('#63B4F5', 5, 3, ctxT);
                estiloDibujo('#A0A0A0', 5, 3, ctxT);
            }
            contadorNivelTem++;

            ctxT.lineTo(pixelX, pixelY);
            ctxT.stroke();

            tTem += dtTem;

            if (tTem == dtTem) {
                Pantalla(x - 10, y);
                estiloLetras('16.5px Arial', '#63B4F5', ctxT, 2);
                ctxT.fillText('C', pixelX, pixelY + 6);
            } else if (tTem > 1) {
                Pantalla(x - 10, y);
                estiloLetras('16.5px Arial', '#F86161', ctxT, 2);
                ctxT.fillText('H', pixelX, pixelY + 5);
            }
        } while (tTem <= 1);

        if (aumentarTem == 1) {
            nivelTemAnimacion += incrementoNivelTem;
        } else {
            nivelTemAnimacion -= incrementoNivelTem;
        }
    }
    ttTem += dttTem;
}


function temperaturaDigital() {
    var widthLetra;
    transformarNivelTemperatura();

    estiloLetras('19px Arial', '#63B4F5', ctxG, 6);
    widthLetra = ctxG.measureText(nivelGas + ' l').width;
    ctxG.fillText(nivelGas + ' l', (canvasGasolina.width / 2) - widthLetra / 2, (canvasGasolina.height / 2) + 5);
}

function transformarNivelTemperatura() {
    var diferenciaRad = finRadianesTem - inicioRadianesTem;
    var nPartes = maximoTem / incrementoTem;

    nivelTem = Math.round((((diferenciaRad - (finRadianesTem - incrementoTem)) * nPartes / diferenciaRad) * maximoTem / nPartes) * 10) / 10;
}

function extraerUnidadTemperatura(t) {
    return t * maximoTem;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIONES PARA MOSTRAR EL NIVEL DE GASOLINA:
var tGas;
var dtGas = 1 / (maximoGas - 1);
var ttGas = 0
var dttGas = 0.05;
var nivelGasAnimacion = 0;

function mostrarNivelGasolina() {
    var x, y;

    var contadorNivelGas = 0;

    tGas = 0;
    if (ttGas >= 1 || ttGas == 0) {
        estiloLienzo(3);
        ttGas = 0;

        if (nivelGasAnimacion == maximoGas - (incrementoNivelGas * 3)) {
            aumentarGas = 2;
            dttGas = 0.007;
        } else if (nivelGasAnimacion < 0) {
            aumentarGas = 1;
            ttGas = -2;
            dttGas = 0.05;
        }

        do {
            x = (xf - x0) * tGas + x0;
            y = (yf - y0) * tGas + y0;

            ctxG.beginPath();
            Pantalla(x + 5, y);
            ctxG.moveTo(pixelX, pixelY);
            Pantalla(x - 5, y);

            if (contadorNivelGas <= nivelGasAnimacion) {
                estiloDibujo('#63B4F5', 6, 6, ctxG);
            } else {
                estiloDibujo('#A0A0A0', 5, 3, ctxG);
            }
            contadorNivelGas++;

            ctxG.lineTo(pixelX, pixelY);
            ctxG.stroke();

            tGas += dtGas;

            if (tGas == dtGas) {
                Pantalla(x - 10, y);
                estiloLetras('16.5px Arial', '#F86161', ctxG, 2);
                ctxG.fillText('E', pixelX, pixelY + 9);
            } else if (tGas > 1) {
                Pantalla(x - 10, y);
                estiloLetras('16.5px Arial', '#63B4F5', ctxG, 2);
                ctxG.fillText('F', pixelX, pixelY + 5);
            }
        } while (tGas <= 1);

        if (aumentarGas == 1) {
            nivelGasAnimacion += incrementoNivelGas;
        } else if (aumentarGas == 2) {
            nivelGasAnimacion -= incrementoNivelGas;
        }
    }
    ttGas += dttGas;
}


function gasolinaDigital() {
    var widthLetra;
    transformarNivelGasolina();

    estiloLetras('19px Arial', '#63B4F5', ctxG, 6);
    widthLetra = ctxG.measureText(nivelGas + ' l').width;
    ctxG.fillText(nivelGas + ' l', (canvasGasolina.width / 2) - widthLetra / 2, (canvasGasolina.height / 2) + 5);
}

function transformarNivelGasolina() {
    var diferenciaRad = finRadianesGas - inicioRadianesGas;
    var nPartes = maximoGas / incrementoGas;

    nivelGas = Math.round((((diferenciaRad - (finRadianesGas - incrementoGas)) * nPartes / diferenciaRad) * maximoGas / nPartes) * 10) / 10;
}

function extraerRadianGasolina(gasIn) {
    var diferenciaRad = finRadianesGas - inicioRadianesGas;

    nivelGasRad = Math.round(((gasIn * diferenciaRad / maximoGas) + finRadianesGas - diferenciaRad) * 100) / 100;

    return nivelGasRad;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIONES PARA MOSTRAR LA ACELERACIÓN:
function mostrarAceleracion() {
    var iniRadAnimacion = extraerRadianAceleracion(1.5);
    var finRadAnimacion = extraerRadianAceleracion(4.5);

    if (acelerar !== 0) {
        estiloLienzo(2);

        estiloDibujo('#63B4F5', 9, 9, ctxA);
        ctxA.beginPath();

        if (acelerar == 1) {
            if (incrementoT >= finRadAnimacion) {
                acelerar = 2;
            } else {
                incrementoT = incrementoT + factorIncrementoT;
            }
        } else {
            if (acelerar == 2) {
                if (incrementoT - factorIncrementoT * 5 < iniRadAnimacion) {
                    incrementoT = iniRadAnimacion;
                    acelerar = 1;
                } else {
                    incrementoT = incrementoT - factorIncrementoT * 5;
                }
            }
        }

        Pantalla(origenRelojX, origenRelojY);
        ctxA.arc(pixelX, pixelY, radioReloj, inicioRadianesT / 10 * Math.PI, (((incrementoT - factorIncrementoT * 11 <= inicioRadianesT) ? incrementoT : incrementoT - factorIncrementoT * 11)) / 10 * Math.PI);
        ctxA.stroke();

        aceleracionDigital();
    }
}


function aceleracionDigital() {
    var widthLetra;
    transformarAceleracion();

    estiloLetras('17px Arial', '#63B4F5', ctxA, 6);
    widthLetra = ctxA.measureText(rpm + ' rpm').width;
    Pantalla(origenRelojX, origenRelojY);
    ctxA.fillText(rpm + ' rpm', pixelX - widthLetra / 2, pixelY + 3);
}

function transformarAceleracion() {
    var diferenciaRad = finRadianesT - inicioRadianesT;
    var nPartes = maximaRpm / incrementoRpm;

    rpm = Math.round((((diferenciaRad - (finRadianesT - incrementoT)) * nPartes / diferenciaRad) * maximaRpm / nPartes) * 10) / 10;
}

function extraerRadianAceleracion(rpmIn) {
    var diferenciaRad = finRadianesT - inicioRadianesT;

    aceleracionRad = Math.round(((rpmIn * diferenciaRad / maximaRpm) + finRadianesT - diferenciaRad) * 100) / 100;

    return aceleracionRad;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIONES PARA MOSTRAR LA VELOCIDAD:
function mostrarVelocidad() {
    var iniRadAnimacion = extraerRadianVelocidad(60);
    var finRadAnimacion = extraerRadianVelocidad(100);

    if (masVelocidad !== 0) {
        estiloLienzo(1);

        estiloDibujo('#63B4F5', 9, 9, ctx);
        ctx.beginPath();

        if (masVelocidad == 1) {
            if (incremento >= finRadAnimacion) {
                masVelocidad = 2;
            } else {
                incremento = incremento + factorIncremento;
            }
        } else {
            if (masVelocidad == 2) {
                if (incremento - factorIncremento < iniRadAnimacion) {
                    incremento = iniRadAnimacion;
                    masVelocidad = 1;
                } else {
                    incremento = incremento - factorIncremento / 2;
                }
            }
        }

        Pantalla(origenRelojX, origenRelojY);
        ctx.arc(pixelX, pixelY, radioReloj, inicioRadianes / 10 * Math.PI, incremento / 10 * Math.PI);
        ctx.stroke();

        velocidadDigital();
    }
}


function velocidadDigital() {
    var widthLetra;
    transformarVelocidad();

    estiloLetras('17px Arial', '#63B4F5', ctx, 6);
    widthLetra = ctx.measureText(velocidad + ' km/h').width;
    Pantalla(origenRelojX, origenRelojY);
    ctx.fillText(velocidad + ' km/h', pixelX - widthLetra / 2, pixelY + 3);
}

function transformarVelocidad() {
    var diferenciaRad = finRadianes - inicioRadianes;
    var nPartes = maximaVelocidad / incrementoVelocimetro;

    velocidad = Math.round((((diferenciaRad - (finRadianes - incremento)) * nPartes / diferenciaRad) * maximaVelocidad / nPartes) * 10) / 10;
}

function extraerRadianVelocidad(velocidadIn) {
    var diferenciaRad = finRadianes - inicioRadianes;

    velocidadRad = Math.round(((velocidadIn * diferenciaRad / maximaVelocidad) + finRadianes - diferenciaRad) * 100) / 100;

    return velocidadRad;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



setInterval(mostrarActividadAuto, 20);



//FUNCIÓN PARA DEFINIR EL ESTILO DEGRADADO DEL STROKE PARA LOS ARCOS:
function estiloStrokeCircular() {
    var radius = 180;
    var canvas = 850;
    var centerx = 300;
    var centery = 300;
    var redstart = 90 * 0.017453292519943;
    // Render
    for (i = 0; i <= 360; i++) {
        var diffr = i;
        var diffg = Math.abs(i - 120);
        var diffb = Math.abs(i - 240);
        red = Math.round((Math.abs(180 - diffr) * 4.25) - 255);
        green = Math.round((Math.abs(180 - diffg) * 4.25) - 255);
        blue = Math.round((Math.abs(180 - diffb) * 4.25) - 255);
        var startAngle = ((i + 1) * Math.PI / 180) - redstart;
        var endAngle = ((i - 1) * Math.PI / 180) - redstart;

        ctx.beginPath();
        ctx.lineWidth = 100;
        ctx.strokeStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        ctx.arc(centerx, centery, radius, startAngle, endAngle, true);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = 'rgb(' + red + ', 0, 0)';
        ctx.lineWidth = 25;
        ctx.arc(centerx, centery, 115, startAngle, endAngle, true);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 25;
        ctx.strokeStyle = 'rgb(0, ' + green + ', 0)';
        ctx.arc(centerx, centery, 87, startAngle, endAngle, true);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 25;
        ctx.strokeStyle = 'rgb(0, 0, ' + blue + ')';
        ctx.arc(centerx, centery, 59, startAngle, endAngle, true);
        ctx.stroke();
        ctx.closePath();
    }
}


///FUNCIÓN PARA DEFINIR ESTILO DE DIBUJO:
function estiloDibujo(colorEstilo, lineWidth, intshadowBlur, ctx) {
    ctx.strokeStyle = colorEstilo;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.shadowBlur = intshadowBlur;
    ctx.shadowColor = colorEstilo;
}

function estiloLetras(tipo, color, ctx, intShadowBlur) {
    ctx.font = tipo;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = intShadowBlur;
}


///FUNCIÓN PARA INICIALIZAR LOS PROCESOS DE DIBUJADO:
function init() {
    initLongitudPlanoCarteciano();
    initLongitudPantalla();

    estiloLienzo(1);
    estiloLienzo(2);
    estiloLienzo(3);
    estiloLienzo(4);

    velocidadDigital();
    aceleracionDigital();
}

window.onload = init();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA INICIALIZAR EL ESTILO DEL LIENZO:
function estiloLienzo(opcion) {
    var gradient;

    switch (opcion) {
        case 1:
            Pantalla(origenRelojX, origenRelojY);
            gradient = ctx.createRadialGradient(pixelX, pixelY, 1, pixelX, pixelY, canvasVelocimetro.height * 3 / 6);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, '#E0E0E0');

            ctx.fillStyle = gradient;
            ctx.shadowBlur = 0;
            ctx.fillRect(0, 0, canvasVelocimetro.width, canvasVelocimetro.height);

            estiloVelocimetro();
            break;
        case 2:
            Pantalla(origenRelojX, origenRelojY);
            gradient = ctxA.createRadialGradient(pixelX, pixelY, 1, canvasTacometro.width / 2, canvasTacometro.height / 2, canvasTacometro.height * 3 / 6);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, '#E0E0E0');

            ctxA.fillStyle = gradient;
            ctxA.shadowBlur = 0;
            ctxA.fillRect(0, 0, canvasTacometro.width, canvasTacometro.height);

            estiloTacometro();
            break;
        case 3:
            Pantalla(0, 0);
            gradient = ctxA.createRadialGradient(pixelX, pixelY, 1, canvasGasolina.width / 2, canvasGasolina.height / 2, canvasGasolina.height * 3 / 6);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, '#E0E0E0');

            ctxG.fillStyle = gradient;
            ctxG.shadowBlur = 0;
            ctxG.fillRect(0, 0, canvasGasolina.width, canvasGasolina.height);
            break;
        case 4:
            Pantalla(0, 0);
            gradient = ctxA.createRadialGradient(pixelX, pixelY, 1, canvasTemperatura.width / 2, canvasTemperatura.height / 2, canvasTemperatura.height * 3 / 6);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, '#E0E0E0');

            ctxT.fillStyle = gradient;
            ctxT.shadowBlur = 0;
            ctxT.fillRect(0, 0, canvasTemperatura.width, canvasTemperatura.height);
            break;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA DIBUJAR LOS VALORES DEL TACÓMETRO:
function estiloTacometro() {
    var t = 0, dt = 0.01111111111;

    var x0 = origenRelojX, y0 = origenRelojY;
    var x, y, x1, y1, x2, y2;

    var aceleracionActual = -1;

    //estiloDibujo('#63B4F5', 8, 5, ctxA);
    estiloDibujo('#A0A0A0', 8, 5, ctxA);

    Pantalla(origenRelojX, origenRelojY);
    ctxA.beginPath();
    ctxA.arc(pixelX, pixelY, radioReloj, inicioRadianesT / 10 * Math.PI, finRadianesT / 10 * Math.PI);
    ctxA.stroke();

    do {
        x = x0 + radioIntervalos * Math.cos(t);
        y = y0 + radioIntervalos * Math.sin(t);

        for (i = 0; i <= maximaRpm; i += incrementoRpm) {
            extraerRadianAceleracion(i - (incrementoRpm / 2));

            if (i > 0 && ((Math.round(aceleracionRad / 10 * Math.PI * 100) / 100) == (Math.round(t * 100) / 100) ||
                    (Math.round(aceleracionRad / 10 * Math.PI * 100) / 100) - 0.01 == (Math.round(t * 100) / 100) ||
                    (Math.round(aceleracionRad / 10 * Math.PI * 100) / 100) + 0.01 == (Math.round(t * 100) / 100))) {

                if (aceleracionActual != i - (incrementoRpm / 2)) {
                    aceleracionActual = i - (incrementoRpm / 2);

                    x1 = x0 + (radioIntervalos + 1) * Math.cos(t);
                    y1 = y0 + (radioIntervalos + 1) * Math.sin(t);

                    estiloDibujo('#A0A0A0', 2.5, 2, ctxA);

                    ctxA.beginPath();
                    Pantalla(x, y);
                    ctxA.moveTo(pixelX, pixelY);
                    Pantalla(x1, y1);
                    ctxA.lineTo(pixelX, pixelY);
                    ctxA.stroke();
                }
            } else {
                extraerRadianAceleracion(i);

                if ((Math.round(aceleracionRad / 10 * Math.PI * 100) / 100) == (Math.round(t * 100) / 100) ||
                        (Math.round(aceleracionRad / 10 * Math.PI * 100) / 100) - 0.01 == (Math.round(t * 100) / 100)) {

                    if (aceleracionActual != i) {
                        aceleracionActual = i;
                        x1 = x0 + (radioIntervalos + 1.75) * Math.cos(t);
                        y1 = y0 + (radioIntervalos + 1.75) * Math.sin(t);

                        estiloDibujo('#A0A0A0', 3.5, 3, ctxA);

                        ctxA.beginPath();
                        Pantalla(x, y);
                        ctxA.moveTo(pixelX, pixelY);
                        Pantalla(x1, y1);
                        ctxA.lineTo(pixelX, pixelY);
                        ctxA.stroke();

                        x2 = x0 + (radioIntervalos + 2.75) * Math.cos(t);
                        y2 = y0 + (radioIntervalos + 2.75) * Math.sin(t);

                        estiloLetras('13.5px Arial', '#A0A0A0', ctxA, 2);

                        Pantalla(x2, y2);
                        switch (i) {
                            case 0:
                                ctxA.fillText(i, pixelX - 8, pixelY + 6);
                                break;
                            case 1:
                                ctxA.fillText(i, pixelX - 7, pixelY + 5);
                                break;
                            case 2:
                                ctxA.fillText(i, pixelX - 8, pixelY + 4);
                                break;
                            case 3:
                                ctxA.fillText(i, pixelX - 9, pixelY + 4);
                                break;
                            case 4:
                                ctxA.fillText(i, pixelX - 7, pixelY + 1);
                                break;
                            case 5:
                                ctxA.fillText(i, pixelX - 5, pixelY);
                                break;
                            case 6:
                                ctxA.fillText(i, pixelX - 3, pixelY);
                                break;
                            case 7:
                                ctxA.fillText(i, pixelX - 2, pixelY - 1);
                                break;
                            case 8:
                                ctxA.fillText(i, pixelX, pixelY + 2);
                                break;
                        }
                    }
                }
            }
        }

        t += dt;
    } while (t <= 2 * Math.PI);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA DIBUJAR LOS VALORES DEL VELOCÍMETRO:
function estiloVelocimetro() {
    var t = 0, dt = 0.01111111111;

    var x0 = origenRelojX, y0 = origenRelojY;
    var x, y, x1, y1, x2, y2;

    var velocidadActual = -1;

    //estiloDibujo('#63B4F5', 8, 5, ctx);
    estiloDibujo('#A0A0A0', 8, 5, ctx);

    Pantalla(origenRelojX, origenRelojY);
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, radioReloj, inicioRadianes / 10 * Math.PI, finRadianes / 10 * Math.PI);
    ctx.stroke();

    do {
        x = x0 + radioIntervalos * Math.cos(t);
        y = y0 + radioIntervalos * Math.sin(t);

        for (i = 0; i <= maximaVelocidad; i += incrementoVelocimetro) {
            extraerRadianVelocidad(i - (incrementoVelocimetro / 2));

            if (i > 0 && ((Math.round(velocidadRad / 10 * Math.PI * 100) / 100) == (Math.round(t * 100) / 100) ||
                    (Math.round(velocidadRad / 10 * Math.PI * 100) / 100) - 0.01 == (Math.round(t * 100) / 100) ||
                    (Math.round(velocidadRad / 10 * Math.PI * 100) / 100) + 0.01 == (Math.round(t * 100) / 100))) {

                if (velocidadActual != i - (incrementoVelocimetro / 2)) {
                    velocidadActual = i - (incrementoVelocimetro / 2);

                    x1 = x0 + (radioIntervalos + 1) * Math.cos(t);
                    y1 = y0 + (radioIntervalos + 1) * Math.sin(t);

                    estiloDibujo('#A0A0A0', 2.5, 2, ctx);

                    ctx.beginPath();
                    Pantalla(x, y);
                    ctx.moveTo(pixelX, pixelY);
                    Pantalla(x1, y1);
                    ctx.lineTo(pixelX, pixelY);
                    ctx.stroke();
                }
            } else {
                extraerRadianVelocidad(i);

                if ((Math.round(velocidadRad / 10 * Math.PI * 100) / 100) == (Math.round(t * 100) / 100) ||
                        (Math.round(velocidadRad / 10 * Math.PI * 100) / 100) - 0.01 == (Math.round(t * 100) / 100) ||
                        (Math.round(velocidadRad / 10 * Math.PI * 100) / 100) + 0.01 == (Math.round(t * 100) / 100)) {

                    if (velocidadActual != i) {
                        velocidadActual = i;
                        x1 = x0 + (radioIntervalos + 1.75) * Math.cos(t);
                        y1 = y0 + (radioIntervalos + 1.75) * Math.sin(t);

                        estiloDibujo('#A0A0A0', 3.5, 3, ctx);

                        ctx.beginPath();
                        Pantalla(x, y);
                        ctx.moveTo(pixelX, pixelY);
                        Pantalla(x1, y1);
                        ctx.lineTo(pixelX, pixelY);
                        ctx.stroke();

                        x2 = x0 + (radioIntervalos + 2.75) * Math.cos(t);
                        y2 = y0 + (radioIntervalos + 2.75) * Math.sin(t);

                        estiloLetras('13.5px Arial', '#A0A0A0', ctx, 2);

                        Pantalla(x2, y2);
                        switch (i) {
                            case 0:
                                ctx.fillText(i, pixelX - 8, pixelY + 6);
                                break;
                            case 20:
                                ctx.fillText(i, pixelX - 17, pixelY + 6);
                                break;
                            case 40:
                                ctx.fillText(i, pixelX - 16, pixelY + 6);
                                break;
                            case 60:
                                ctx.fillText(i, pixelX - 16, pixelY + 4);
                                break;
                            case 80:
                                ctx.fillText(i, pixelX - 15, pixelY + 1);
                                break;
                            case 100:
                                ctx.fillText(i, pixelX - 16, pixelY - 3);
                                break;
                            case 120:
                                ctx.fillText(i, pixelX - 13, pixelY - 1);
                                break;
                            case 140:
                                ctx.fillText(i, pixelX - 10, pixelY);
                                break;
                            case 160:
                                ctx.fillText(i, pixelX - 9, pixelY - 2);
                                break;
                            case 180:
                                ctx.fillText(i, pixelX - 3, pixelY - 2);
                                break;
                        }
                    }
                }
            }
        }

        t += dt;
    } while (t <= 2 * Math.PI);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///INICIALIZANDO VALORES DEL PLANO CARTECIANO Y DE LA PANTALLA DEL LIENZO:
function initLongitudPlanoCarteciano() {
    x1 = -20;
    x2 = 20;
    y1 = -20;
    y2 = 20;
}

function initLongitudPantalla() {
    sx1 = 0;
    sx2 = canvasTemperatura.width - 1;
    sy1 = 0;
    sy2 = canvasTemperatura.height - 1;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///FUNCIÓN PARA TRANSFORMAR COORDENADAS REALES A COORDENADAS DEL CANVAS:
function Pantalla(x, y)
{
    pixelX = ((((sx1 - sx2) / (x1 - x2)) * (x - x1)) + sx1);
    pixelY = ((((sy1 - sy2) / (y1 - y2)) * (y - y2)) + sy2);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 REFERENCIAS:
 
 http://stivengordillo.com/como-dibujar-con-canvas/
 http://jsfiddle.net/Aijoona/qMhHY/
 http://www.w3schools.com/TAgs/canvas_measuretext.asp
 */