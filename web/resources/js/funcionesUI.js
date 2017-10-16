/*document.write('<script src="https://code.jquery.com/jquery-1.11.3.js"></script>');*/


///////////////////////////////////MENU PRINCIPAL://////////////////////
var idMenu = 1;
//REF: http://stackoverflow.com/questions/28591301/how-to-pass-javascript-variables-as-parameters-to-jsf-action-method
function redireccionar(idMenu) {
    $("[id*='idMenu']").val(idMenu);
    $("[id*='btnRedirect']").click();
    return false;
}
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//MENUS DINÁMICOS - CAMBIO DE COLOR ICONO MENUS:
$(document).ready(function () {
    $('[class^="jsId"]').each(function (indice1, elemento1) {
        $(elemento1).find("i").each(function (indice, elemento) {
            if (indice === 0) {
                $(elemento).attr("class", $(elemento).text());
                $(elemento).text("");
            }
        });

        if ($(elemento1).attr("class").indexOf("active-menuitem") !== -1) {
            $(elemento1).children("a").addClass("menu-activo");

            $(elemento1).find("ul li").each(function (indice, elemento) {
                if ($(elemento).attr("class") !== undefined) {
                    if ($(elemento).attr("class").indexOf("active-menuitem") !== -1) {
                        $(elemento).children("a").addClass("menu-activo");
                    }
                }
            });
        }
        else {
            if ($(elemento1).parent().attr("class") !== undefined) {
                if ($(elemento1).parent().attr("class").indexOf("active-menuitem") !== -1) {
                    $(elemento1).children("a").addClass("menu-activo");
                }
            }
        }

        $(elemento1).on("click", function () {
            if ($(elemento1).attr("class").indexOf("active-menuitem") !== -1) {
                $(elemento1).children("a").addClass("menu-activo");
                $(elemento1).siblings().find("a").removeClass("menu-activo");
            }
            else {
                $(elemento1).children("a").removeClass("menu-activo");
                if ($(elemento1).parent().attr("class") !== undefined) {
                    if ($(elemento1).parent().attr("class").indexOf("active-menuitem") !== -1) {
                        $(elemento1).addClass("menu-activo");
                        $(elemento1).parent().siblings().find("a").removeClass("menu-activo");
                    }
                    else {
                        $(elemento1).removeClass("menu-activo");
                    }
                }
            }
        });
    });
});
////////////////////////////////////////////////////////////////////////////////
//ROLES Y PRIVILEGIOS:
function prepararInterfaz() {
    $('[id*="btnGuardarPermisos"]').attr("style", "visibility:visible");
    $('[id*="btnCancelarAsignar"]').attr("style", "visibility:visible");
    $('[id*="btnAsignarPermisos"]').attr("style", "display:none");
    $('[id*="btnVolverRoles"]').attr("style", "display:none");
}

function activarFondoCargando() {
    $('.fondo_cargando').attr("style", "display:block");
}

function selCbxTablaGlobalPrivilegios() {
    var idFila, contador, posFila, idCbxSelect;
    $('[id$="chBxSeleccionado"]').on("click", function () {
        idCbxSelect = $(this).parent().parent().parent().parent().parent().parent().parent().parent().attr("id");
        if ($(this).parent().parent().parent().parent().parent().parent().parent().parent().prev().find("tbody > tr").last().attr("data-ri") === undefined) {
            idFila = parseInt($(this).parent().parent().attr("data-ri"));
        }
        else {
            contador = 0;
            posFila = -1;
            $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().children('div').each(function (posicion, elemento) {
                if (idCbxSelect !== $(elemento).attr("id")) {
                    posFila = $(elemento).find("tbody > tr").last().attr("data-ri");
                    contador += parseInt($(elemento).find("tbody > tr").last().attr("data-ri")) + 1;
                }
                else {
                    return false;
                }
            });
            idFila = contador + parseInt($(this).parent().parent().attr("data-ri"));
        }
        $('[id$=":' + idFila + $(this).attr("id").substring($(this).attr("id").indexOf('chBxSeleccionado') - 1) + 'H"]').find("div > span").parent().attr("class", $(this).find("div > span").parent().attr("class"));
        $('[id$=":' + idFila + $(this).attr("id").substring($(this).attr("id").indexOf('chBxSeleccionado') - 1) + 'H"]').find("div > span").attr("class", $(this).find("div > span").attr("class"));

        $('[id$=":' + idFila + $(this).attr("id").substring($(this).attr("id").indexOf('chBxSeleccionado') - 1) + 'H"]').find("div > input").prop("checked", $(this).find("div > input").prop("checked"));
    });
}

////////////////////////////////////////////////////////////////////////////////
//Pie de pagina
function piePagina() {
    copyright = new Date();
    update = copyright.getFullYear();
    document.write(" &copy; " + update + "-" + "Yelou          ");
}
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//traductor 
function translatebing() {
    setTimeout(function () {
        {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.charset = 'UTF-8';
            s.src = ((location && location.href && location.href.indexOf('https') == 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=True&ui=true&settings=Manual&from=es**&ctf;=True&from=en&hidelanguages=da,hr,af,ar,bg,sk,sl,et,fi,cy,el,he,hi,mww,nl,hu,id,ja,sw,tlh,lv,lt,ms,mt,vi,ur,uk,tr,th,sv,sr-Latn,sr-Cyrl,ru,ro,pt,pl,fa,otq,no,yua,cs,ca,yue,bs-Latn,ko,ht';
            var p = document.getElementsByTagName('head')[0] || document.documentElement;
            p.insertBefore(s, p.firstChild);
        }
    }, 0);
}

////////////////////////////////////////////////////////////////////////////////
//LOGIN
//LOGIN
function inicioSesion() {
    $("input[id$='personaHidden']").val($("input[id$='persona']").val());
    if ($("input[id$='personaclave']").val() !== "")
        $("input[id$='personaclaveHidden']").val(hex_sha1($("input[id$='personaclave']").val()));

}

$(document).ready(function () {
    $("[id$='btnLogin']").on("click", function () {
        $("input[id$='persona']").blur();
        if ($("input[id$='personaclave']").val() != "") {
            $("input[id$='personaclave']").blur();
        }
        $("[id$='submitLogin']").click();
    });
});

//REF1: http://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
//REF2: http://www.forosdelweb.com/f13/evitar-submit-tecla-enter-formulario-con-solo-campo-303479/
$(document).keypress(function (e) {
    if (e.which === 13 || e.keyCode === 13) {
        $("[id$='btnLogin']").click();
    }
});

/*function validar(e) {
 tecla = (document.all) ? e.keyCode : e.which;
 if (tecla == 8)
 return true;
 patron = /\d/;
 te = String.fromCharCode(tecla);
 return patron.test(te);
 }*/

function validar(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1) {
        if (!tecla_especial)
            return false;
    }
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1) {
        if (!tecla_especial)
            return false;
    }
}

function comprobarClave() {
    if ($("input[id*='personaclave']").val() != $("input[id*='pass']").val()) {
        alert("ERROR, Las claves son distintas...")
    } else {
        inicioSesion();
    }
}
function comprobarClave1() {
    if ($("input[id*='personaclave']").val() != $("input[id*='pass']").val()) {
        alert("ERROR, Las claves son distintas...")
        return false
    }
    else
    {
        inicioSesion1();
    }
}

function myFunction() {
    if ($("input[id*='persona']").val() != '')
        $("input[id*='persona']").val("");
}

///para el taxista chofer cliente (revisar)
function Login() {
    if ($("input[id*='personaclave']").val() != '')
        $("input[id*='personaclave']").val(hex_sha1($("input[id*='personaclave']").val()));

    if ($("input[id*='pass']").val() != '')
        $("input[id*='pass']").val(hex_sha1($("input[id*='pass']").val()));
}

function Login1() {
    if ($("input[id*='personaclave']").val() != '')
        $("input[id*='personaclave']").val(($("input[id*='personaclave']").val()));

    if ($("input[id*='pass']").val() != '')
        $("input[id*='pass']").val(($("input[id*='pass']").val()));
}

function anterior() {
    if ($("input[id*='claveant']").val() != '')
        $("input[id*='claveant']").val(hex_sha1($("input[id*='claveant']").val()));
}

function comprobarClave2() {
    if ($("input[id*='personaclave']").val() != $("input[id*='pass']").val()) {
        alert("ERROR, Las claves son distintas...")
        return false;
    }
    else
    {
        Login1();
    }
}
function comprobarClave3() {
    if ($("input[id*='personaclave']").val() != $("input[id*='pass']").val()) {
        alert("ERROR, Las claves son dististas...")
    } else {
        Login();
    }
}
//////////////////////////////////////////////////////////////////
//enviar al correo en nuevo registro
function enviarCorreoCliente() {
    var correo = $("input[id*='personacorreo']").val();
    enviarCorreo([{name: "correo", value: correo}]);
    //alert("Revise su correo para comprobar su registro..");
}
//////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//Para no retroceder cuando esta logueado
function nobackbutton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome
    window.onhashchange = function () {
        window.location.hash = "";
    }
}

//////////////////////////////////////////////////////////////////
//para traducir el calendar de primefaces
PrimeFaces.locales['es'] = {
    closeText: 'Cerrar',
    prevText: 'Anterior',
    nextText: 'Siguiente',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekHeader: 'Semana',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    timeOnlyTitle: 'Sólo hora',
    timeText: 'Tiempo',
    hourText: 'Hora',
    minuteText: 'Minuto',
    secondText: 'Segundo',
    currentText: 'Fecha actual',
    ampm: false,
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    allDayText: 'Todo el día'}



/*
 
 $(document).ready(function(){
 console.log("arrancar"); 
 $("#pass").click(function(){
 verificarPassword();
 });
 });*/