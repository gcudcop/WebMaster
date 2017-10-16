package master.logica.funciones;

import accesoDatos.AccesoDatos;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import master.logica.entidades.Usuario;

public class FUsuario {

    public static Usuario loginUsuario(String correo, String clave) throws Exception {
        Usuario usuario = null;
        AccesoDatos accesoDatos;
        String sql;
        PreparedStatement prstm;
        ResultSet resultSet;
        try {
            accesoDatos = new AccesoDatos();
            sql = "SELECT * FROM sch_admin.f_login_usuario(?,?)";
            prstm = accesoDatos.creaPreparedSmt(sql);
            prstm.setString(1, correo);
            prstm.setString(2, clave);
            resultSet = accesoDatos.ejecutaPrepared(prstm);
            while (resultSet.next()) {
                usuario = new Usuario();
                usuario.setIdPersona(resultSet.getInt("sr_id_persona"));
                usuario.setCedula(resultSet.getString("chv_cedula"));
                usuario.setRuc(resultSet.getString("chv_ruc"));
                usuario.setPasaporte(resultSet.getString("chv_pasaporte"));
                usuario.setNombres(resultSet.getString("chv_nombres"));
                usuario.setApellidos(resultSet.getString("chv_apellidos"));
                usuario.setCelular(resultSet.getString("chv_celular"));
                usuario.setTelefono(resultSet.getString("chv_telefono"));
                usuario.setFoto(resultSet.getString("chv_foto"));
                usuario.setFechaNacimiento(resultSet.getDate("dt_fecha_nacimiento"));
                usuario.setGenero(resultSet.getString("ch_genero"));
                usuario.setEstadoCivil(resultSet.getString("chv_estado_civil"));
                usuario.setCiudad(resultSet.getString("chv_ciudad"));
                usuario.setDireccion(resultSet.getString("chv_direccion"));
                usuario.setNick(resultSet.getString("chv_nick"));
                usuario.setMail(resultSet.getString("chv_mail"));
                usuario.setPassword(resultSet.getString("chv_password"));
                usuario.setFechaRegistro(resultSet.getTimestamp("ts_fecha_registro"));
                usuario.setFechaBaja(resultSet.getTimestamp("ts_fecha_registro"));
                usuario.setEstadoLogico(resultSet.getString("ch_estado_logico"));
            }
            accesoDatos.desconectar();
        } catch (Exception e) {
            throw e;
        }
        return usuario;
    }
}
