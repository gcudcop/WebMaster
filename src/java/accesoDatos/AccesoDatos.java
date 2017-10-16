/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package accesoDatos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author Usuario
 */
public class AccesoDatos {

    public Connection con;
    public PreparedStatement prStm;
    public ResultSet rs;

    //<editor-fold defaultstate="collapsed" desc="Constructor de la Clase">
    public AccesoDatos() throws Exception {
        Global global = new Global();
        try {
            Class.forName(global.getDRIVER());
            con = DriverManager.getConnection(global.getURL(), global.getUSER(), global.getPASS());

        } catch (ClassNotFoundException e) {
            throw e;
        }
    }
    //</editor-fold>

    //ResultSet devuelve la tabla resultado de la Consulta
    public ResultSet ejecutaQuery(String sql) throws SQLException, ClassNotFoundException {
        rs = null;
        try {
            Statement st = con.createStatement();

            rs = st.executeQuery(sql);
        } catch (SQLException exConec) {
            throw exConec;
        }
        return rs;
    }

    //Ejecuta actualizaciones y eliminaciones    
    public int ejecutaQueryEscalar(String sql) throws Exception {
        int res = 0;
        try {
            Statement st = con.createStatement();
            res = st.executeUpdate(sql);
        } catch (SQLException exConec) {
            throw exConec;
        }
        return res;
    }

    //Ejecuta una actualización sobre una tabla de base de datos
    public boolean ejecutaPreparedComando(PreparedStatement prStm) throws Exception {
        int i = -1;
        try {
            i = prStm.executeUpdate();
        } catch (SQLException exConec) {
            throw exConec;
        }
        if (i > 0) {
            return true;
        } else {
            return false;
        }
    }

    //
    public boolean ejecutaPreparedComandopa(PreparedStatement prStm) throws Exception {
        int i = -1;
        boolean bandera = true;
        String error = "";
        try {

            i = prStm.executeUpdate();

        } catch (SQLException exConec) {
            throw exConec;

        }
        return bandera;
    }

    //Ejecuta una actualización
    public int ejecutaPreparedInt(PreparedStatement prStm) throws Exception {
        int i = -1;
        try {
            rs = prStm.executeQuery();
            while (rs.next()) {
                i = rs.getInt(1);
            }
        } catch (SQLException exConec) {
            throw exConec;
        }
        return i;
    }

    //<editor-fold defaultstate="collapsed" desc="Método para ejecutar una Sentencia SQL con Parámetros"> 
    public ResultSet ejecutaPrepared(PreparedStatement prStm) throws Exception {
        rs = null;
        try {
            rs = prStm.executeQuery();
        } catch (SQLException exConec) {
            throw exConec;
        }
        return rs;
    }
    //</editor-fold>

    //Un Prepared Statemen ejecuta uns consulta Select
    public PreparedStatement creaPreparedSmt(String sql) throws Exception {
        prStm = null;
        try {
            prStm = con.prepareStatement(sql);

        } catch (SQLException exConec) {
            throw exConec;
        }

        return prStm;
    }

    //Desconecta la conexión de un enlace a una base de datos
    public void desconectar() throws Exception {
        try {
            con.close();
            con = null;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public PreparedStatement creaPreparedSmtAdmin(String sql) throws Exception {
        prStm = null;
        try {
            prStm = con.prepareStatement(sql);
        } catch (SQLException exConec) {
            throw exConec;
        }
        return prStm;
    }

    public ResultSet ejecutaPreparedAdmin(PreparedStatement prStm) throws Exception {
        rs = null;
        try {
            rs = prStm.executeQuery();
        } catch (SQLException exConec) {
            throw exConec;
        }
        return rs;
    }

    //Desconecta la conexión de un enlace a una base de datos
    public void desconectarAdmin() throws Exception {
        try {
            con.close();
            con = null;
        } catch (Exception ex) {
            throw ex;
        }
    }

}
