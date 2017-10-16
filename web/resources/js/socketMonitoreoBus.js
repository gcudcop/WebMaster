ruta = new Array();
lpa = new Array();
tramos = new Array();
$(function () {
    var objtipoio = io.connect("http://192.168.0.163:8005");
    /*Funcion q dibuja el mapa
     * 
     */


    $("#conectarNodo").click(conectarNodo = function (lat, lon) { //conectar con el server node al cargar el mapa
       
        tipo = parent.$("#tipo").val();
        nodo = parent.$("#nodo").val();
        nombre = parent.$("#nombres").val();
        lati = parent.$("#latitud").val();
        lng = parent.$("#longitud").val();
        linea = parent.$("#linea").val();
        rut = parent.$("#ruta").val();
        placa = parent.$("#placa").val();
        tipo= parseInt(tipo);
        linea= parseInt(linea);
        rut= parseInt(rut);
        try {
            var obj = {"nodo": nodo, "nombre": nombre, "lat": lat, "lng": lon, "linea": linea, "ruta": rut, "tipo": tipo, "placa": placa};
            objtipoio.emit("nick", obj); // enviar al server node que se a conectado
        } catch (e) {

        }
    });

    //taxista envia al server que sale de la sesion
    $("#enviarPosicion").click(enviarPosicion = function (lat, lng) {

        var nodo = $("#nodo").val();
        var objBus = {nodo: nodo, lat: lat, lng: lng};
        objtipoio.emit("moverCarro", objBus); //llama funcion server
    });

    //taxista envia al server que sale de la sesion
    $("#enviarPosicionBus").click(enviarPosicionBus = function (lat, lng, id) {
        var objBus = {placa: id, lat: lat, lng: lng};
        objtipoio.emit("desplazarBus", objBus); //llama funcion server
    });

    //taxista envia al server que sale de la sesion
    $("#conectarBusesMongo").click(conectarBusesMongo = function (objBus) {
        console.log("registrando");
        console.log(objBus);
        if (!objBus.length) {
            alert("No hay datos de esta lista");
        }
        for (var i = 0; i < objBus.length; i++) {
            var objParametro = {
                "placa": objBus[i].objTurno.objRutaConductorUnidad.objConductorUnidad.objUnidadTransporte.objBus.strPlaca,
                "lat": objBus[i].objTurno.objRutaConductorUnidad.objConductorUnidad.objUnidadTransporte.objBus.dpLatitud,
                "lng": objBus[i].objTurno.objRutaConductorUnidad.objConductorUnidad.objUnidadTransporte.objBus.dpLongitud,
                "pasajeros": objBus[i].objTurno.objRutaConductorUnidad.objConductorUnidad.objUnidadTransporte.objBus.intPasajeros,
                "numeroDisco": objBus[i].objTurno.objRutaConductorUnidad.objConductorUnidad.objUnidadTransporte.objBus.strNumDisco,
                "recorrido": objBus[i].int_recorrido,
                "horario": objBus[i].int_id,
                "idConductor": objBus[i].objTurno.objRutaConductorUnidad.objConductorUnidad.intIdConducUnid,
                "turno": objBus[i].objTurno.intIdTurno
            }
            objtipoio.emit("registrarBus", objParametro); //llama funcion server
            console.log(objBus[i]);
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
        console.log("paradas");
        console.log(lt);
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
                        objHorario = {"hora_plan": lh[j].tm_hora_plan, "idConductor": lh[j].objParadaRuta.objRuta.objLinea.intIdLinea};
                        listaHorario.push(objHorario);
                    } else {
                        objHorario = {"hora_plan": lh[j].tm_hora_plan, "idConductor": lh[j].objParadaRuta.objRuta.objLinea.intIdLinea};
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
                    console.log("traendo tramo");
                    console.log("parada origen" + lt[count].intIdParadaO + "parada destino " + lt[count].intIdParadaD);
                    var parametros = {"linea": lt[count].objParadaRuta.objRuta.objLinea.intIdLinea, "ruta": lt[count].objParadaRuta.objRuta.intIdRuta, "paradao": lt[count].intIdParadaO, "paradad": lt[count].intIdParadaD}
                    objtipoio.emit("traerTramo", parametros);
                }
            }
            var objParada = {"idParada": lp[i].objParada.intIdParada, "idRuta": lp[i].objRuta.intIdRuta, "idLinea": lp[i].objRuta.objLinea.intIdLinea, "horarios": listaHorario};
            //objtipoio.emit("guardarHorarios", objParada);
        }

        var myLatlng = new google.maps.LatLng(lp[0].objParada.dpLatitud, lp[0].objParada.dpLongitud);
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
            //parent.mensajeValidar("No hay tramos para mostrar");
            //markup.setMap(null);;
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
    objtipoio.on("addBus", function (obj) { // añadir taxis en el mapa
        //
        console.log("obj bus");
        console.log(obj);
        nuevoBus(obj); //llamar a la funcion que esta ne el iframe); //llamar a la funcion que esta ne el iframe

        var padre = parent.document.getElementById("botones");
        //padre.innerHTML = "";
        var input = document.createElement("INPUT");
        //aquí indicamos que es un input de tipo text
        input.type = 'button';
        input.id = obj.placa;
        //input.className = 'botones';
        input.value = obj.placa;
        input.onclick = function (i) {
            //alert(this.id);
            setVehi(this.id);
            //objtipoio.emit("traerRuta6", this.id);
        }
        //y por ultimo agreamos el componente creado al padre
        padre.appendChild(input);
    });

    objtipoio.on("mostrarBuses", function (lr) {

        var padre = parent.document.getElementById("boton");
        padre.innerHTML = "";

        if (lr.length > 0) {
            for (var i = 0, max = lr.length; i < max; i++) {
                //aquí instanciamos al componente padre
                //aquí agregamos el componente de tipo input
                var input = document.createElement("INPUT");
                //aquí indicamos que es un input de tipo text
                input.type = 'button';
                input.id = lr[i].id;
                input.className = 'botones';
                input.value = lr[i].descripcion;
                input.onclick = function (i) {
                    alert(this.id);
                    objtipoio.emit("traerRuta6", this.id);
                }
                //y por ultimo agreamos el componente creado al padre
                padre.appendChild(input);
            }
        }
        else {
            alert("sin datos");
        }
//        for (var i = 0, max = lr.length; i < max; i++) {
//            var newdiv = document.createElement('div');
//           // newdiv.innerHTML = "<br><input type='button' class='botones' name='dia_" + i + "' value='" + lr[i].descripcion + "'>";
//            newdiv.innerHTML = "<br><button class='mostrar3' type='button' value='" + lr[i].id + "' >"+lr[i].descripcion+"</button> ";
//            micapa.appendChild(newdiv);
//        }
    });




});

