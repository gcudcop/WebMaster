package master.logica.funciones;

import accesoDatos.AccesoDatos;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import master.logica.entidades.Menu;

public class FMenu {

    public static List<Menu> obtenerMenusDadoRol(int rol) throws Exception {
        List<Menu> lst = new ArrayList<>();
        AccesoDatos accesoDatos;
        PreparedStatement stm;
        Menu menu;
        ResultSet resultSet;
        String consulta;
        try {
            accesoDatos = new AccesoDatos();
            consulta = "select * from sch_admin.f_obtener_submenus_dado_rol(?)";
            stm = accesoDatos.creaPreparedSmt(consulta);
            stm.setInt(1, rol);
            resultSet = accesoDatos.ejecutaPrepared(stm);
            while (resultSet.next()) {
                menu = new Menu();
                menu.setIdMenu(resultSet.getInt("id_menu"));
                menu.setNombre(resultSet.getString("menu"));
                menu.setIcono(resultSet.getString("icono_menu"));
                lst.add(menu);
            }
        } catch (Exception e) {
            throw e;
        }
        return lst;
    }

    public static List<Menu> obtenerMenusDadoPadre(int padre) throws Exception {
        List<Menu> lst = new ArrayList<>();
        AccesoDatos accesoDatos;
        PreparedStatement stm;
        Menu menu;
        ResultSet resultSet;
        String consulta;
        try {
            accesoDatos = new AccesoDatos();
            consulta = "select * from sch_admin.f_obtener_menu_dado_padre(?)";
            stm = accesoDatos.creaPreparedSmt(consulta);
            stm.setInt(1, padre);
            resultSet = accesoDatos.ejecutaPrepared(stm);
            while (resultSet.next()) {
                menu = new Menu();
                menu.setIdMenu(resultSet.getInt("sr_id_menu"));
                menu.setNombre(resultSet.getString("chv_nombre"));
                menu.setIcono(resultSet.getString("chv_icono"));
                lst.add(menu);
            }
        } catch (Exception e) {
            throw e;
        }
        return lst;
    }

}
