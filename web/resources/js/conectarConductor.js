
$(function () {
    //alert("iniciando");
    var objtipoio = io.connect("http://192.168.0.163:8005");

   $("#conectarNodo").click(conectarNodo = function (lat, lon) { //conectar con el server node al cargar el mapa
        tipo = $("#tipo").val();
        nodo = $("#nodo").val();
        alert("conectarNodo"+nodo);
        if (tipo === '1') { //tipo conductor
             //alert("tipo 2");
            try {
                var obj = {nodo:nodo,lat: lat, lng: lon, nombres: nombres, tipo: tipo, linea:1};
                objtipoio.emit("nick", obj); // enviar al server node que se a conectado
                document.getElementById("iframeCenter").contentWindow.cargandoTaxi(); //llamar a la funcion que esta ne el iframe
            } catch (e){
             
            }
        }
        if (tipo === 2) {  //tipo taxista
             alert("taxista");
            //caputar de datos de la pagina cargada
            var nodo = $("#nodo").val();
            //var estado = document.getElementById('estado').value;
            var placa = document.getElementById('placas').value;
            var idCoop = document.getElementById('idCoop').value;
            var rolch = document.getElementById('rol').value;
            var Coop = document.getElementById('Coop').value;
            var telefono = document.getElementById('telefono').value;
            var idGestionChofer = document.getElementById('gestionchofer').value;
            //var imagen = document.getElementById('fotoChofer').src;
            alert("logueandome");
            var obj = {lat: lat, lng: lon, nodo: nodo, nombres: nombres, placas: placa, tipo: tipo, idCoop: idCoop, coop: Coop, telfono: telefono, idGestionChofer: idGestionChofer, rolch: rolch, linea: 2};
            objtipoio.emit("nick", obj); // enviar al node server que se a conectado el taxista
             //alert("emit nick");
        }
    });
    
      //taxista envia al server que sale de la sesion
    $("#enviarPosicion").click(enviarPosicion = function (lat, lng) {
 
        var nodo = $("#nodo").val();
        //alert("Enviando"+lat+"longitud"+lng+"id"+nodo);
        var objBus = {nodo: nodo, lat: lat, lng: lng};
        //console.log(objTaxi);
        objtipoio.emit("moverCarro", objBus); //llama funcion server
    });    
});

