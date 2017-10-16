/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package recursos;

/**
 *
 * @author Usuario
 */
public class RConstantes {

    //<editor-fold defaultstate="collapsed" desc="CONSTANTES DE ROLES DE USUARIO">
    public final static int SUPER_ADMIN_STD = 1;
    public final static int ADMIN_SOCIEDAD = 2;
    public final static int OPERADOR = 3;
    public final static int SOCIO = 4;
    public final static int CONDUCTOR = 5;
    public final static int CLIENTE = 6;

    //</editor-fold>

    public final static String RUTA_FOTO = "C:\\fotos\\";
    public final static String FOTO_DEFECTO = "usuario.png";

    //<editor-fold defaultstate="collapsed" desc="CONSTANTES DE MENUS Y PRIVILEGIOS">
    public static class ConstantesMenus {

        public static final int INICIO = 1;
        public static final int SOCIEDADES = 3;
        public static final int UNIDADES_DE_TRANSPORTE = 4;
        public static final int FORMAS_DE_PAGO = 5;
        public static final int ROLES = 6;
        public static final int PERMISOS = 7;
        public static final int USUARIOS = 8;
        public static final int TERRITORIAL = 13;
        public static final int REPORTES = 19;
        public static final int CONDUCTORES_UNIDAD = 20;
        public static final int OPERADORES = 9;
        public static final int SOCIOS = 10;
        public static final int CONDUCTORES_AUTORIZADOS = 11;
        public static final int GEOLOCALIZACION = 14;
        public static final int MONITOREO = 15;
        public static final int EVENTOS_OPERACIONALES = 17;
        public static final int CONDUCTORES_UNIDADES = 20;
        public static final int ASIGNAR_TURNOS = 25;
        public static final int AGENDACION = 26;
        
        //USUARIO:
        public static final int ITINERARIOS = 22;
        public static final int RECARGAS = 23;
        public static final int HORARIO_VIAJES = 27;
        public static final int HORARIO_VIAJES_PARADAS = 28;
        ////
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="CONSTANTES DE PERMISOS">
    public static class ConstantesPermisos {

        public final static int ACCEDER_SUBMENUS = 1;
        public final static int INSERTAR = 2;
        public final static int LISTAR = 3;
        public final static int VISUALIZAR = 4;
        public final static int ACTUALIZAR = 5;
        public final static int DESACTIVAR = 6;
        public final static int IMPRIMIR = 7;
        public final static int DESCARGAR = 8;
        public final static int CARGAR = 9;
        public final static int ELIMINAR = 10;
        public final static int ACTIVAR = 11;
    }
    //</editor-fold>
}
