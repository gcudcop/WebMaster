package master.logica.funciones;

import accesoDatos.AccesoDatos;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import master.logica.entidades.RolUsuario;

public class FRolUsuario {

    public static List<RolUsuario> obtenerRolesDadoUsuario(int idUsuario) throws Exception {
        List<RolUsuario> lst = new ArrayList<>();
        AccesoDatos accesoDatos;
        PreparedStatement stm;
        RolUsuario ru;
        ResultSet resultSet;
        String consulta;
        try {
            accesoDatos = new AccesoDatos();
            consulta = "select * from sch_admin.f_obtener_roles_dado_usuario(?)";
            stm = accesoDatos.creaPreparedSmt(consulta);
            stm.setInt(1, idUsuario);
            resultSet = accesoDatos.ejecutaPrepared(stm);

            while (resultSet.next()) {
                ru = new RolUsuario();
                ru.getRol().setIdRol(resultSet.getInt("int_id_rol"));
                ru.getRol().setRol(resultSet.getString("chv_rol"));
                ru.getRol().setDescripcion(resultSet.getString("descripcion_rol"));
                ru.getUsuario().setIdPersona(resultSet.getInt("sr_id_persona"));
                ru.setPrivInsertar(resultSet.getInt("int_priv_insertar"));
                ru.setPrivEditar(resultSet.getInt("int_priv_editar"));
                ru.setPrivEliminar(resultSet.getInt("int_priv_eliminar"));
                ru.setPrivSeleccionar(resultSet.getInt("int_priv_seleccionar"));
                lst.add(ru);
            }
        } catch (Exception e) {
            System.out.println("obtenerBusesDadoLinea dice: " + e.getMessage());
            throw e;
        }
        return lst;
    }
}
