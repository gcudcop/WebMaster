/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
     ///////////////////
     var formulario = document.formulario_registro,
    elementos = formulario.elements;

  // Funcion que se ejecuta cuando el evento click es activado
          var enviar = function(e) {
          };

          var focusInput = function() {
           // this.parentElement.children[1].className = "label active";
          };

          var blurInput = function() {
            if (this.value <= 0) {
              //this.parentElement.children[1].className = "label";
            }
          };

        formulario.addEventListener("submit", enviar);
          for (var i = 0; i < elementos.length; i++) {
              elementos[i].addEventListener("focus", focusInput);
              elementos[i].addEventListener("blur", blurInput);
          }
        });
