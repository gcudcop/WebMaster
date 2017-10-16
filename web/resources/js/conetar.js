paradaMostrar = "";
$(function () {
    var objtipoio = io.connect("http://192.168.0.121:8005");
    /*Funcion q dibuja el mapa
     * 
     */

    $("#linea").change(function () {
        alert("Handler for .change() called." + $("#linea").val());
        var indice = parseInt($("#linea").val());
        objtipoio.emit("traerListaBus", indice);
    });

    $("#cargar").click(cargar);
    function cargar() {
        objtipoio.emit("traerListaBus")
    }
    objtipoio.on("mostrarBuses", function (lr) {

        var padre = document.getElementById("boton");
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



    $("#dibujar").click(dibujar = function () {
        opcion = 1;
    });

    $("#gRuta").click(dibujar = function () {
        var cedula = $("#ci").val();
        objtipoio.emit("recibeListaRutas", {lista: posisionesArray, ci: cedula});
        posisionesArray = [];
    });

//Funcion del bus
    objtipoio.on("mostrarRuta6", function (lr) {
        console.dir(lr);
        var flightPath = new google.maps.Polyline({
            path: lr[0].rutas,
            geodesic: true,
            strokeColor: '#0077BE',
            strokeOpacity: 0.3,
            strokeWeight: 8
        });
        flightPath.setMap(map);
        //objtipoio.emit("recibeListaRutas", posisionesArray);
        //posisionesArray = [];
    });

//Funcion que envia las coordenadas al servidor Node
//y grafica la ruta;
    $("#mostrar").click(dibujar = function () {
        opcion = 2;
        var cedula = $("#ci").val();
        alert(cedula);
        objtipoio.emit("traerRuta", cedula);
    });

    objtipoio.on("mostrarMapa", function (lr) {
        console.dir(lr);
        var flightPath = new google.maps.Polyline({
            path: lr[0].rutas,
            geodesic: true,
            strokeColor: '#0077BE',
            strokeOpacity: 0.3,
            strokeWeight: 8
        });
        flightPath.setMap(map);
        //objtipoio.emit("recibeListaRutas", posisionesArray);
        //posisionesArray = [];
    });

    //PARADAS

    /* Funcion que muestra las paradas
     */
    $("#paradaMostrar").click(paradaMostrar = function () {
        opcion = 3;
        if (para) {
            objtipoio.emit("paradaLista", para);
        }
    });

    $("#mostrarParada").click(function () {
        objtipoio.emit("traerParada");
    });

    objtipoio.on("mostrarParada", function (lp) {
        var infowindow, des;
        infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < lp.length; i++) {
            des = '<div id="content">' +
                    '<table>' +
                    '<caption> Tabla de Datos </caption>' +
                    '<tr>' +
                    '<th> Horario del Bus ' + i + 'i :' +
                    '</th>' +
                    '<td> 8:00 a 9:00' +
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th> Tiempo:' + i +
                    '</th>' +
                    '<td> 30 min' +
                    '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</div>';

            createMarker(lp[i], des);
        }

        function createMarker(place, des) {
            var placeLoc = place;
            var marker = new google.maps.Marker({
                map: map,
                position: place,
                draggable: true,
                animation: google.maps.Animation.DROP,
                icon: parada,
                title: 'Su ubicacion Actual Dario' + i
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(des);
                infowindow.open(map, this);
            });
        }
    });


    $("#dibujarPerimetro").click(dibujarPerimetro = function () {
        opcion = 4;
    });

    $("#guardarPerimetro").click(function () {
        objtipoio.emit("recibeListaPerimetro", perimetroArray);
        perimetroArray = [];
    });

    $("#mostrarPerimetro").click(dibujar = function () {
        opcion = 5;
        objtipoio.emit("traerPerimetro");
    });

    objtipoio.on("mostrarPerimetro", function (lp) {
        var flightPath = new google.maps.Polygon({
            paths: lp,
            strokeColor: '#3D0C02',
            strokeOpacity: 1.0,
            strokeWeight: 1,
            fillColor: '#6E7F80',
            fillOpacity: 0.35

        });
        flightPath.setMap(map);
        console.log(lp);
        //objtipoio.emit("recibeListaRutas", posisionesArray);
        //posisionesArray = [];
    });

//-------------------------
//Consulta a dato de la BD-
    $("#dibujar").click(dibujar = function () {
        opcion = 1;
    });


    $("#clientes").click(clientes = function () {
        alert("mostrando");
        objtipoio.emit("traerClientes");
    });

    objtipoio.on("mostrarClientes", function (lp) {

        console.log(lp);
        //objtipoio.emit("recibeListaRutas", posisionesArray);
        //posisionesArray = [];
    });
    //--------------------------------
    //var id = document.getElementById("id").value;
    var nombre = document.getElementById("nombre").value;
    $("#conectarServerSk").click(conectarServerSk = function (lat, lon, id) {
        var obj = {lat: parseFloat(lat), lng: parseFloat(lon), nombre: nombre, id: id};
        objtipoio.emit("logueo", obj);
    });

    objtipoio.on("addCliente", function (obj) { // añadir taxis en el mapa
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var tax = getCli(obj.nodo);
        console.log(obj);
        if (tax == null) ///tax==undefined
        { //insertar como nuevo
            insertarClientes(obj);
            //document.getElementById('numLibres').innerHTML = taxisLibres.length;
            //document.getElementById("iframeCenter").contentWindow.nuevoCarro(obj.lat, obj.lng, obj.nodo, obj.nombres, obj.estado, obj.coop, obj.foto, obj.placas, obj.idGestionChofer); //llamar a la funcion que esta ne el iframe
            nuevoCliente(obj.id, obj.nombre, obj.lat, obj.lng); //llamar a la funcion que esta ne el iframe
        }
    });

    ////insertar al vector de taxis libres
    function insertarClientes(obj) {
        var exist = listaclientes.indexOf(obj.id);
        if (exist === -1) {
            listaclientes.push(obj.id);
        }
    }
});1