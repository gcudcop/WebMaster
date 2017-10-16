var taxisLibres = []; //vector de taxis libres
var taxisOcupados = []; // vector de taxis ocupados
var taxisPermitidos = []; // vector de taxis ocupados

$(function () {
    //captura de datos de la pagina cargada
    var nodo = document.getElementById('nodo').value;
    var tipo = document.getElementById('tipo').value;
    var nombres = document.getElementById('nombres').value;
    var rol = document.getElementById('rol').value;

    var socket = io.connect("http://52.24.145.8:8001"); //conectar el socket al server node 
    $("#conectarNodo").click(conectarNodo = function (lat, lon) { //conectar con el server node al cargar el mapa
        var obj = {lat: lat, lng: lon, nodo: nodo, nombres: nombres, tipo: tipo};
        socket.emit("nick", obj); // enviar al server node que se a conectado
    });

    /// funciones socket
    socket.on("addTaxista", function (obj) { // añadir taxis en el mapa
        var idCoop = document.getElementById('idCoop').value;
        if (idCoop === obj.idCoop) {
            var tax = document.getElementById("iframeCenter").contentWindow.getTaxi(obj.nodo); //llamar a la funcion que esta ne el iframe getTaxi
            if (tax == null) ///tax==undefined
            { //insertar como nuevo
                if (parseInt(obj.estado) === 1) { //libre
                    insertarTaxisLibre(obj.nodo);
                    document.getElementById('numLibres').innerHTML = taxisLibres.length;
                    document.getElementById("iframeCenter").contentWindow.nuevoCarro(obj.lat, obj.lng, obj.nodo, obj.nombres, obj.estado, obj.coop, obj.foto, obj.placas); //llamar a la funcion que esta ne el iframe
                }
                if (parseInt(obj.estado) === 2) { //ocupado
                    if (nodo == obj['ocupado']) {  // si es el mismo taxi que yo he solicitado
                        document.getElementById("iframeCenter").contentWindow.nuevoCarro(obj.lat, obj.lng, obj.nodo, obj.nombres, 3, obj.coop, obj.foto, obj.placas); //llamar a la funcion que esta ne el iframe
                    } else {
                        document.getElementById("iframeCenter").contentWindow.nuevoCarro(obj.lat, obj.lng, obj.nodo, obj.nombres, obj.estado, obj.coop, obj.foto, obj.placas); //llamar a la funcion que esta ne el iframe
                    }
                    insertarTaxisOcupados(obj.nodo); //agrega al vector de taxis ocupados el nodo
                    document.getElementById("numOcupados").innerHTML = taxisOcupados.length; // actualiza en la vista el numero
                }
            } else {
                document.getElementById("iframeCenter").contentWindow.moverCarro(obj.lat, obj.lng, obj.nodo); //llama a la funcion del iframe del cliente ara mover carro
            }
            insertarTaxisPermitidos(obj.nodo); //pendiente
        }
    });

    /**CHOFER(TAXISTA)**/
    // FUNCIONES ENVIADAS DESDE EL TAXISTA AL NODE SERVER

    ///enviar al server notificacion de un aviso al taxista unicast
    $("#notificAvisoSK").click(notificAvisoSK = function (idchofer, contentaviso) {
        var obj = {idchofer: idchofer, msjaviso: contentaviso};
        socket.emit("notificarAvisoS", obj); //llama a la funcion del server node
    });

    //enviar notificacion de aviso a los taxistas broadcast
    $("#notifiAvisoBroadSK").click(notifiAvisoBroadSK = function (contentaviso) {
        var obj = {msjaviso: contentaviso};
        var idCoop = document.getElementById('idCoop').value;
        socket.emit("notificarAvisoBroadS", obj, idCoop);//llama a la funcion del server node
    });

    // taxista envia al server que ha llegado adonde esta el cliente
    $("#llegoTaxiC").click(llegoTaxiC = function (idDest) {
        // captura datos de la vista
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var idServicio = document.getElementById('frm:idServicio').value;
        var obj = {lat: lat, lng: lon, nodo: nodo, nombres: nombres, ids: idServicio};
        socket.emit("llegoTaxi", idDest, obj); //llama a la funcion del node server
    });

    /**CLIENTE OPERADORA**/
    //FUNCIONES ENVIADAS AL SERVER NODE POR PARTE DEL CLIENTE

    //cliente Obtine la lista de taxis
    $("#obtenerListaTaxis").click(obtenerListaTaxis = function () {
        var idCoop = document.getElementById('idCoop').value;
        socket.emit("getTaxistasOpe", idCoop); //si es operadora  solo muestra sus coches
    });

    //cliente envia al server node una solicitud de carrera programada
    $("#solCarreraProgramadaSk").click(solCarreraProgramadaSk = function (fecha, hora, destino, tiempo, idcliente) {
        //captura de datos de la pagina
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var obj = {lat: lat, lng: lon, nombres: nombres, idOrigen: nodo, fecha: fecha, hora: hora, destino: destino, tiempo: tiempo, idCliente: idcliente};
        socket.emit("pedirTaxiProgramado", obj, taxisPermitidos); //llama funcion del server
    });

    ///cliente envia al server una solicitud de carrera unicast
    $("#solicitudtaxi").click(solicitudtaxi = function (idch, objCli) {
        //captura de datos de la pagina del cliente
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var obj = {lat: lat, lng: lon, nombres: nombres, idOrigen: nodo, tipo: '1', objCliente: objCli};
        socket.emit("pedirTaxi", obj, idch); //funcion en el server para enviar la peticion
    });

    ///cliente envia al server la cancelacion carrera normal a taxista
    $("#cancelarCarreraCliSK").click(cancelarCarreraCliSK = function (id, idservcancel) {
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var motivo = "ninguno";
        var motivo = prompt("motivo?", "");
        var obj = {lat: lat, lng: lon, nombres: nombres, idOrigen: nodo, motivo: motivo};
        if (motivo !== null) { //si acpta al enviar el motivo de cancelacion
            socket.emit("cancelarcarreraClis", obj, id.toString()); //llama a la funcion del socket
            guardarCancelarCarrera([{name: "idServic", value: idservcancel}, {name: "motivo", value: motivo}]); //llama a la funcion del controlador para guardar la cancelacion de la carrera
            document.getElementById("iframeCenter").contentWindow.cambiarestadocar(id, 1); //llamar a la funcion que esta ne el iframe para cambiar su estado
        }
    });

    ///cliente envia al server la cancelacion carrera normal a taxista
    $("#cancelarServOpeSK").click(cancelarServOpeSK = function (idgch, nomcli) {
        console.log('llego a mi socket');
        var obj = {nombres: nombres, idOrigen: nodo, nomcli:nomcli};
        socket.emit("cancelarServOpeS", obj, idgch.toString()); //llama a la funcion del socket
    });

    // cliente envia al server la cancelacion de la carrera programada
    $("#cancelarCarProgSK").click(cancelarCarProgSK = function (fprog, motivo, idchofer) {
        var idcho = parseInt(idchofer);
        var obj = {fprog: fprog, motivo: motivo, idOrigen: nodo, nombres: nombres};
        socket.emit("cancelarcarreraProClis", obj, idcho); //llama a la funcion del server
    });

    //cliente envia al server una solicitud de carrera a todos los taxis que estan dentro del rango broadcast
    $("#solicitarTodosSK").click(solicitarTodosSK = function (objCli) {
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var obj = {lat: lat, lng: lon, nombres: nombres, idOrigen: nodo, tipo: '2', objCliente: objCli};
        socket.emit("solicitarTodoS", obj, taxisLibres); //llama funcion del server
    });

    ///FUNCIONES RECIBIDAS DEL SERVER AL CLIENTE

    // guardar en la bd postres la notificcaion broacast
    socket.on("recibirGuardarAviso", function (objmsj, vChoferes) {
        var rolope = document.getElementById('rol').value;
        var vchofer = [];
        for (var key in vChoferes) {
            vchofer.push(vChoferes[key].idPersona + "-" + vChoferes[key].rolch);
        }
        guardaravisochofer([{name: "rolope", value: rolope}, {name: "idoperador", value: nodo}, {name: "mensaje", value: objmsj.msjaviso}, {name: "vchofer", value: vchofer}, {name: "tipoaviso", value: 2}]); //llama al controlador para guardar la notificacion tipo aviso=2=broadcast
    });
    
    // guardar en la bd postres la notificcaion broacast PENDIENTE
    socket.on("cambiarColorCar", function (idch) {
        console.log("cambiando estado"+idch);
        document.getElementById("iframeCenter").contentWindow.cambiarestadocar(idch, 1); //llamar a la funcion que esta ne el iframe para cambiar su estado
    });

    // guardar la notificacion unicast de la operadora
    socket.on("recibirGuardarAvisoUni", function (obj, objch) {
        var taxi = JSON.parse(JSON.stringify(objch));
        var rolch = taxi[0].rolch;
        var rolope = document.getElementById('rol').value;
        guardaravisochofer([{name: "rolope", value: rolope}, {name: "idoperador", value: nodo}, {name: "rolch", value: rolch}, {name: "mensaje", value: obj.msjaviso}, {name: "iddestino", value: obj.idchofer}, {name: "tipoaviso", value: 1}]); //llama al controlador para guardar la notificacion tipo aviso=1=unicast
    });

    // cliente recibe el cambio de posicion o moviminto del carro en el mapa
    socket.on("moverCarroCli", function (obj) {
        var idCoop = document.getElementById('idCoop').value;
        if (idCoop === obj.idCoop) {
            document.getElementById("iframeCenter").contentWindow.moverCarro(obj.lat, obj.lng, obj.nodo); //llama a la funcion del iframe del cliente ara mover carro
        }
    });

    // quita un carro cuando se desconecta de la pagina
    socket.on("quitarTaxi", function (id) {
        var tax = document.getElementById("iframeCenter").contentWindow.getTaxi(id); //llamar a la funcion que esta ne el iframe
        if (tax != null) ///tax==undefined
        { //insertar como nuevo
            if (tax.estado === '1') { // libre
                quitarTaxislibre(id);
                document.getElementById('numLibres').innerHTML = taxisLibres.length; //actualiza su valor en la vista
            }
            if (tax.estado === '2') { //ocupado
                quitarTaxisOcupados(id);
                document.getElementById('numOcupados').innerHTML = taxisOcupados.length; //actualiza su valos en la vista
            }
            document.getElementById("iframeCenter").contentWindow.quitarcarro(id); //quita el carro del mapa
            sumarTaxis(taxisLibres.length, taxisOcupados.length); //funcion para actualizar valos en el monitoreo
            quitarTaxisPermitidos(id);
        }
    });

    //cliente recibe notificacion de que el chofer a aceptado su solicitud de carrera
    socket.on("recibirAcepCli", function (obj) {
        var lat = document.getElementById('latitud').value;
        var lon = document.getElementById('longitud').value;
        var idCoop = document.getElementById('idCoop').value;
        var rol = document.getElementById('rol').value;
        if (obj.tipo === 3) {//carrera programada
            guardarCarreraProgramada([{name: "rol", value: rol}, {name: "cliente", value: obj.idCliente}, {name: "idope", value: nodo}, {name: "lat", value: lat}, {name: "lon", value: lon}, {name: "tipo", value: 3}, {name: "destino", value: obj.destino}, {name: "fecha", value: obj.fecha}, {name: "hora", value: obj.hora}, {name: "tiempo", value: obj.tiempo}, {name: "idGestion", value: obj.idGestion}, {name: "idCoop", value: idCoop}]);
            document.getElementById('iframeCenter').contentWindow.notiacepcarbroad(obj.nombres, 1); //aceptar programada
            var obj = {cliente: {nombres: nombres, id: nodo}};
            socket.emit("notificaTodoacS", obj);
        } else { //carrera normnal
            if (obj.tipo === 2) { //para broadcast
                var objCliente = {cliente: {nombres: nombres, id: nodo}, taxis: taxisLibres, idCh: obj.idOrigen};
                socket.emit("notificaTodoacS", objCliente);
            }

            guardarcarreraOperador([{name: "rol", value: rol}, {name: "cliente", value: obj.idCliente}, {name: "idope", value: nodo}, {name: "lat", value: lat}, {name: "lon", value: lon}, {name: "tipo", value: 1}, {name: "idGestion", value: obj.idGestion}, {name: "idCoop", value: idCoop}]); //llama a la la funcion para guardar con el cotrolador en la bd psotgres
            quitarTaxislibre(obj.idOrigen);
            insertarTaxisOcupados(obj.idOrigen);
            document.getElementById('numLibres').innerHTML = taxisLibres.length;
            document.getElementById('numOcupados').innerHTML = taxisOcupados.length;
            document.getElementById('iframeCenter').contentWindow.notiacepcarbroad(obj.nombres, 2); //aceptar broacast
            
        }
    });

    ///cliente recibe notificacion de que el taxista a cancelado la carrera
    socket.on("recibirCancelCli", function (obj) {
        alert("EL taxista " + obj.nombres + " ha cancelado/anulado la carrera");
    });

    // cliente recibe cambio el estado de un taxi a ocupado, libre, esperando  
    socket.on("cambiarEstadoTaxi", function (param) {
        console.log("se cmabio es estado de un taxi ");
        var tax = document.getElementById("iframeCenter").contentWindow.getTaxi(param.id); //llamar a la funcion que esta ne el iframe
        if (tax.estado !== param.estado)
        {
            if (parseInt(param.estado) === 1) { //libre
                console.log("esra libree");
                quitarTaxisOcupados(param.id);
                insertarTaxisLibre(param.id);
                document.getElementById("iframeCenter").contentWindow.cambiarestadocar(param.id, param.estado, param.nombres); //llamar a la funcion que esta ne el iframe
            }
            if (parseInt(param.estado) === 2) { //ocupado
                quitarTaxislibre(param.id);
                insertarTaxisOcupados(param.id);
                if (param.idOrigen.toString() === nodo.toString()) { //ocupado para mi
                    document.getElementById("iframeCenter").contentWindow.cambiarestadocar(param.id, 3, param.nombres); //llamar a la funcion que esta ne el iframe
                } else {  //ocupado para los demas clientes
                    document.getElementById("iframeCenter").contentWindow.cambiarestadocar(param.id, param.estado, param.nombres); //llamar a la funcion que esta ne el iframe
                }
            }
            document.getElementById('numLibres').innerHTML = taxisLibres.length;
            document.getElementById('numOcupados').innerHTML = taxisOcupados.length;
        }
    });

    // cliente opradora reicbe su lista de taxis
    socket.on("mostrarTaxistasOpe", function (taxistas) {
        for (var key in taxistas) {
            var taxi = JSON.parse(JSON.stringify(taxistas[key]));
            insertarTaxisPermitidos(taxi['idPersona']);
            if (parseInt(taxi['estado']) === 1) { //libre
                insertarTaxisLibre(taxi['idPersona']);
                document.getElementById("iframeCenter").contentWindow.nuevoCarro(taxi['latitud'], taxi['longitud'], taxi['idPersona'], taxi['nombres'], taxi['estado'], taxi['nomCoop'], taxi['foto'], taxi['placas'], taxi['idGestionChofer']); //llamar a la funcion que esta ne el iframe
            } else
            { //ocupado
                insertarTaxisOcupados(taxi['idPersona']);
                if (parseInt(nodo) === parseInt(taxi['ocupado'])) {  // si es el mismo taxi que yo he solicitado
                    document.getElementById("iframeCenter").contentWindow.nuevoCarro(taxi['latitud'], taxi['longitud'], taxi['idPersona'], taxi['nombres'], 3, taxi['nomCoop'], taxi['foto'], taxi['placas'], taxi['idGestionChofer']); //llamar a la funcion que esta ne el iframe
                } else {
                    document.getElementById("iframeCenter").contentWindow.nuevoCarro(taxi['latitud'], taxi['longitud'], taxi['idPersona'], taxi['nombres'], taxi['estado'], taxi['nomCoop'], taxi['foto'], taxi['placas'], taxi['idGestionChofer']); //llamar a la funcion que esta ne el iframe
                }
            }
        }
        document.getElementById('numLibres').innerHTML = taxisLibres.length;
        document.getElementById('numOcupados').innerHTML = taxisOcupados.length;
        sumarTaxis(taxisLibres.length, taxisOcupados.length); //llama a funcion sumar para el monitore de taxis
    });

    ///cliente recibe la notificacion de que el chofer a rechazado la carrera unicast
    socket.on("recibirRechazoCli", function (obj) {
        document.getElementById("iframeCenter").contentWindow.recibirnotificarrechazar(obj.nombres); //llamar a la funcion que esta ne el iframe
    });

    // cliente recibe la notificacion que el chofer ha cancelado la carrera programada
    socket.on("recibirCancelCarProCli", function (obj) {
        alert("El taxista: " + obj.nombres + " ha cancelado la carrera programada para el dia " + obj.fprog + " por motivo " + obj.motivo);
    });

    // cliente recibe la notificacion de que ya llego un taxi
    socket.on("recibirLlegoTaxi", function (obj) {  //esta funcion actua cuando llega un mensaje al cliente     
        alert("El Taxista " + obj.nombres + " ya llego a llevarle.");
    });
});

    function sumarTaxis(lib, ocu) { //funcion para modificar el numero de carros libre y ocupados
        $("#totalTaxis").fadeOut(function () {
            $(this).text(lib + ocu).show(400);
        });
    }

    function encodeImage(imageUri, callback) { // funcion para codificar la imagen en base 64
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            c.width = this.width;
            c.height = this.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL); //retorna a foto en base 64
        };
        img.src = imageUri;
    }

    function insertarTaxisLibre(id) {
        var exist = taxisLibres.indexOf(id);
        if (exist === -1) {
            taxisLibres.push(id);
        }
    }

    function quitarTaxislibre(id) {
        var exist = taxisLibres.indexOf(id);
        if (exist !== -1) {
            taxisLibres.splice(exist, 1);
        }
    }
    function insertarTaxisOcupados(id) {
        var exist = taxisOcupados.indexOf(id);
        if (exist === -1) {
            taxisOcupados.push(id);
        }
    }

    function quitarTaxisOcupados(id) {
        var exist = taxisOcupados.indexOf(id);
        if (exist !== -1) {
            taxisOcupados.splice(exist, 1);
        }
    }

    function insertarTaxisPermitidos(id) {
        var exist = taxisPermitidos.indexOf(id);
        if (exist === -1) {
            taxisPermitidos.push(id);
        }
    }

    function quitarTaxisPermitidos(id) {
        var exist = taxisPermitidos.indexOf(id);
        if (exist !== -1) {
            taxisPermitidos.splice(exist, 1);
        }
    }
