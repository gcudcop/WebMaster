var flightPath; //variable q dibuja el perimetro
var flightPatht; //variable q dibuja el perimetro
var dibujarParada = "";
var markup;
var ruta = [];
var lpa = [];
var lparadas;
var tramos = [];
var estado = 1;

/// funciones socket
/*CAbmbiar de icono al atrazado*/
/// funciones socket

$(function () {

    /**
     * [objtipoio Variable que conecta/recibe/hace peticiones con el servidor]
     * @type {[io]}
     */
    var objtipoio = io.connect("http://192.168.0.163:8005");

    /**
     * [conectarNode Conecta con el server node al cargar el mapa e inicia seccion]
     * @param  {[double]} lat  [Variable de posicion latitud]
     * @param  {[double]} lon) [Variable de posicion longitud]{                    
     *                       var nodo [variable identificadora]
     *                       var nombres [nombre de la entidad]
     *                       var rol [rol de usuario]
     */

    $("#dibujarRuta").click(conectarNode = function (lat, lon) {
        alert("hola");
        opcion = 1;
    });

    $("#dibujarParada").click(conectarNode = function (lat, lon) {
        alert("hola");
        opcion = 3;
    });
    $("#conectarNode").click(conectarNode = function (lat, lon) {
        var nodo = parent.$("#id").val();
        var nombres = parent.$("#nombres").val();
        var rol = parent.$("#rol").val();
        var linea = parent.$("#linea").val();

        try {
            var obj = {nodo: nodo, nombres: nombres, lat: lat, lng: lon, tipo: rol};
            objtipoio.emit("nick", obj); // enviar al server node que se a conectado
            //parent.traerParadas(linea);
            // document.getElementById("iframeCenter").contentWindow.cargandoTaxi(); //llamar a la funcion que esta ne el iframe
            //objtipoio.emit("traerListaBusCli", 15);
            //objtipoio.emit("traerListaTrayectoriaCli", 15);
            //objtipoio.emit("traerListaPerimetroCli", 15);
            //objtipoio.emit("traerHorarioViajes", 15); //lista de paradas
            //objtipoio.emit("traerHorario", 15);// mostrar lista paradas con horaios incluidos
            //objtipoio.emit("traerBusesCli", 15);
            //llama a la funcion del controlador para guardar la cancelacion de la carrera
            //var linea = 1;
        } catch (e) {
            console.log(e.message);
        }
    });


    /**
     * [dibujarRutas Dibuja en el mapa el punto inicial y el final de la ruta]
     * @param  {google} lista)     { lista de puntos latitud, longitud
     */

    $("#dibujarRutas").click(dibujarRutas = function (lista) {
        if (!lista.length) {
            parent.mensajeValidar("No hay datos de esta lista");
            return false;
        }
        for (var i in lista) {
            crearRuta(lista[i].intIdRuta, lista[i].dpLatitudOrig, lista[i].dpLongitudOrig, lista[i].dpLatitudDest, lista[i].dpLongitudDest);
        }
        function crearRuta(id, latori, longori, latdes, longdes) {

            markup = new google.maps.Marker({
                position: {lat: parseFloat(latori), lng: parseFloat(longori)},
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5
                },
                draggable: false,
                map: map
            });
            ruta.push(markup);
            markup = new google.maps.Marker({
                position: {lat: parseFloat(latdes), lng: parseFloat(longdes)},
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5
                },
                draggable: true,
                map: map
            });
            ruta.push(markup);
        }
    });

    $("#dibujarParadas").click(dibujarParadas = function (lp, lh, lt) {
        lparadas = lp;
        var horario = "HORARIO";
        var infowindow, des;
        var objhorario;
        infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < lp.length; i++) {
            var listaHorario = [];
            for (var j = 0; j < lh.length; j++) {
                if (lp[i].objParada.intIdParada === lh[j].objParadaRuta.objParada.intIdParada && lh[j].objParadaRuta.objRuta.intIdRuta === lp[i].objRuta.intIdRuta) {
                    horario = horario + "<br/>" + lh[j].tm_hora_plan;
                    if (j == lh.length) {
                        objHorario = {"hora_plan": lh[j].tm_hora_plan, "horario": parseInt(lh[j].int_id), "recorrido": parseInt(lh[j].int_recorrido), "idConductor": parseInt(lh[j].objTurno.objRutaConductorUnidad.objConductorUnidad.intIdConducUnid), "hora_real": lh[j].tm_hora_real};
                        listaHorario.push(objHorario);
                    } else {
                        objHorario = {"hora_plan": lh[j].tm_hora_plan, "horario": parseInt(lh[j].int_id), "recorrido": parseInt(lh[j].int_recorrido), "idConductor": parseInt(lh[j].objTurno.objRutaConductorUnidad.objConductorUnidad.intIdConducUnid), "hora_real": lh[j].tm_hora_real};
                        listaHorario.push(objHorario);
                    }
                }
            }

            des = '<div id="content">' +
                    '<table>' +
                    '<caption><b> Tabla de Datos</b> </caption>' +
                    '<tr>' +
                    '<th> Parada:' +
                    '</th>' +
                    '<td> ' + lp[i].objParada.strDescripcion +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th> Linea:' +
                    '</th>' +
                    '<td> ' + lp[i].objRuta.objLinea.intIdLinea +
                    '</td>' +
                    '</tr>' +
                    '<tr >' +
                    '<th colspan="2" align="center">' + horario +
                    '</th>' +
                    '</tr>' +
                    '</table>' +
                    '</div>';
            createMarker(lp[i].objParada.dpLatitud, lp[i].objParada.dpLongitud, des, lp[i].objParada.intIdParada);
            for (var count = 0; count < lt.length; count++) {
                if (lp[i].objParada.intIdParada == lt[count].intIdParadaO) {
                    var parametros = {"linea": lt[count].objParadaRuta.objRuta.objLinea.intIdLinea, "ruta": lt[count].objParadaRuta.objRuta.intIdRuta, "paradao": lt[count].intIdParadaO, "paradad": lt[count].intIdParadaD}
                    objtipoio.emit("traerTramo", parametros);
                }
            }
            var objParada = {"idParada": lp[i].objParada.intIdParada, "idRuta": lp[i].objRuta.intIdRuta, "idLinea": lp[i].objRuta.objLinea.intIdLinea, "horarios": listaHorario};
            objtipoio.emit("guardarHorarios", objParada);
        }

        var myLatlng = new google.maps.LatLng(lp[1].objParada.dpLatitud, lp[1].objParada.dpLongitud);
        var latLng = JSON.parse(JSON.stringify(myLatlng));
        map.setCenter(latLng);
        map.setZoom(15);

        function createMarker(lat, lng, des, i) {
            marker = new google.maps.Marker({
                map: map,
                position: {lat: parseFloat(lat), lng: parseFloat(lng)},
                animation: google.maps.Animation.DROP,
                icon: parada,
                draggable: false,
                title: 'Su ubicacion Actual Dario' + i
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(des);
                infowindow.open(map, this);
            });
            lpa.push(marker);
            horario = "HORARIO";
        }
    });


    objtipoio.on("mostrarTramo", function (tramo) { // añadir taxis en el mapa
        if (!tramo.length) {
            return false;
        }
        flightPath = new google.maps.Polyline({
            path: tramo[0].trayectorias,
            geodesic: true,
            strokeColor: '#0077BE',
            strokeOpacity: 0.3,
            strokeWeight: 8
        });
        flightPath.setMap(map);
        tramos.push(flightPath);
    });

    /// funciones socket
    objtipoio.on("addConductor", function (obj) { // añadir taxis en el mapa
        console.log("Ania diendo conductor");
        console.log(obj);
//        var linea = parseInt($("#linea").val());
//        nuevoCarro(obj); //llamar a la funcion que esta ne el iframe); //llamar a la funcion que esta ne el iframe
//        if (linea == parseInt(obj.linea)) {
//            // console.log("entramos al nuevo carro");
//                    nuevoCarro(obj); //llamar a la funcion que esta ne el iframe); //llamar a la funcion que esta ne el iframe
//
//             addLista(obj);
//        }
    });

    /// funciones socket
    objtipoio.on("addBus", function (obj) { // añadir taxis en el mapa
        var linea = parent.$("input[id=linea]").val();//$("[id$=idLinea]").val();

        if (linea == obj.linea) {
            nuevoBus(obj); //llamar a la funcion que esta ne el iframe); //llamar a la funcion que esta ne el iframe
        }
    });

    $("#conectarNodeBus").click(conectarNodeBus = function (obj) {
        var obj = JSON.parse(obj);
        try {
            var objNode = {nodo: obj.vehiculoId, lat: obj.lat, lng: obj.log, vectorangle: obj.vectorangle, gpstime: obj.gpstime, vectorspeed: obj.vectorspeed, linea: obj.linea, ruta: obj.ruta, tipo: 1};
            objtipoio.emit("nick", objNode); // enviar al server node que se a conectado
        } catch (e) {
            console.log(e.message);
        }
    });



    $("#ubicacion").click(ubicacion = function (id, ruta) {
        if (!id || !ruta) {
            parent.mensajeValidar("No hay coordenadas");
            return false;
        }
        var param = {"nodo": id, "ruta": ruta}
        objtipoio.emit("traerVehiculo", param);
    });


    /// funciones socket
    objtipoio.on("mostrarVehiculo", function (obj) { // añadir taxis en el mapa
        var myLatlng = new google.maps.LatLng(obj[0].lat, obj[0].lng);
        var latLng = JSON.parse(JSON.stringify(myLatlng));
        map.setCenter(latLng);
        map.setZoom(19);
    });

    $("#mostrarParada").click(mostrarParada = function (lat, lon) {

        var myLatlng = new google.maps.LatLng(lat, lon);
        var latLng = JSON.parse(JSON.stringify(myLatlng));
        map.setCenter(latLng);
        map.setZoom(19);
    });

    $("#borrar").click(borrar = function () {

        if (flightPath) {
            flightPath.setMap(null);
            for (var i = 0; i < lpa.length; i++) {
                lpa[i].setVisible(false);
            }
        }
        if (tramos.length) {
            for (var i = 0; i < tramos.length; i++) {
                tramos[i].setMap(null);
            }
        }
        if (ruta.length) {
            for (var i = 0; i < ruta.length; i++) {
                ruta[i].setVisible(false);
            }
        }
    });


    $("#borrarParadas").click(borrarParadas = function () {
        if (flightPath) {
            flightPath.setMap(null);
            for (var i = 0; i < lpa.length; i++) {
                lpa[i].setVisible(false);
            }
        }
    });

    $("#borrarBuses").click(borrarBuses = function () {
        if (flightPath) {
            flightPath.setMap(null);
            for (var i = 0; i < lpa.length; i++) {
                lpa[i].setVisible(true);
            }
        }
        var buses = [];
        if (taxis.length) {
            for (var i = 0; i < taxis.length; i++) {
                buses.push(taxis[i]);//var ta = JSON.parse(taxis[i]);
            }
        }
    });


    var mensaje, parametro;

    $("#cercaniaBus").click(cercaniaBus = function (latitud, longitud, obj) {
        var disMaxima = 5;
        var horallegada = mostrarhora();
        for (var i = 0; i < lpa.length; i++) {
            var posicion = lpa[i].getPosition();
            posicion = JSON.parse(JSON.stringify(posicion));
            var dis = calcularDistancia(latitud, longitud, posicion.lat, posicion.lng);
            if (dis <= disMaxima) {
                mensaje = "Bus " + obj.placa + " llego a la parada " + lparadas[i].objParada.strDescripcion + "a las";
                parametro = {"placa": obj.placa, "recorrido": parseInt(obj.recorrido), "parada": parseInt(lparadas[i].objParada.intIdParada), "horaLlegada": horallegada, "idConductor": parseInt(obj.idConductor), "horario": parseInt(obj.horario)};
                parent.traerHorariosBus(obj.turno);
                paramtro = 0;

            }
        }
    });

    $("#listaHorarios").click(listaHorarios = function (obj) { // añadir taxis en el mapa
        parametro.horario = new Array();
        for (var i = 0; i < obj.length; i++) {
            parametro.horario.push({"horario": parseInt(obj[i].int_id), "recorrido": parseInt(obj[i].int_recorrido), "turno": parseInt(obj[i].objTurno.intIdTurno)});
        }
        objtipoio.emit("verAtrazo", parametro);
    });

    $("#cambiarEstado").click(cambiarEstado = function (obj, estado) { // añadir taxis en el mapa
        parent.mensajeValidar(mensaje);
        if (estado == 1) {
            buses[id].setIcon('../../resources/imagenes/rojo_icon.png');
        }
        if (estado == 0) {
            buses[id].setIcon('../../resources/imagenes/bus5.png');
        }
    });


    objtipoio.on("cambiarEstado", function (obj, estado) {
        if (estado == 1) {
            parent.mensajeValidar(mensaje + "  tarde !");
            buses[obj.placa].setIcon('../../resources/imagenes/ico_bust.png');
        }
        if (estado == 0) {
            parent.mensajeValidar(mensaje + " a tiempo!");
            buses[obj.placa].setIcon('../../resources/imagenes/ico_bus.png');
        }
    });


    objtipoio.on("moverCarroCli", function (obj) {
        moverCarro(obj.lat, obj.lng, obj.nodo); //llama a la funcion del iframe del cliente ara mover carro
    });


    objtipoio.on("moverBus", function (obj) {
        var bus = getBus(obj.placa);
        var linea = parent.$("input[id=linea]").val();
        console.log("moviendo bus"+obj);
        console.log(obj);
        if (bus) {
            if (obj.linea == linea) {
                moverBus(obj.lat, obj.lng, obj.placa); //llama a la funcion del iframe del cliente ara mover carro
            } else {
                ocultarBus(obj.placa);
            }
        } else {
            nuevoBus(obj);
        }
    });

    function calcularDistancia(lat1, lon1, lat2, lon2) { //calcular la distancia entre dos puntos geográficos
        var R = 6371; // Radio del planeta tierra en km
        var phi1 = lat1 * (Math.PI / 180);
        var phi2 = lat2 * (Math.PI / 180);
        var deltaphi = (lat2 - lat1) * Math.PI / 180;
        var deltalambda = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltalambda / 2) * Math.sin(deltalambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return (d * 1000);
    }

    function mostrarhora() {
        var f = new Date();
        cad = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
        return(cad);
        //setTimeout("mostrarhora()",1000); 
    }
});

