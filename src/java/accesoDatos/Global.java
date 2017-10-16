/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package accesoDatos;

import java.util.ResourceBundle;

/**
 *
 * @author Usuario
 */
public class Global {

    private static ResourceBundle conexion = java.util.ResourceBundle.getBundle("accesoDatos.Conexion");
    public final static String URL = conexion.getString("url");
    public final static String DRIVER = conexion.getString("driver");
    public final static String USER = conexion.getString("user");
    public final static String PASS = conexion.getString("password");

    public String getURL() {
        return URL;
    }

    public String getDRIVER() {
        return DRIVER;
    }

    public String getUSER() {
        return USER;
    }

    public String getPASS() {
        return PASS;
    }
}
