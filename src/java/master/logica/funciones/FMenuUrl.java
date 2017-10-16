package master.logica.funciones;

import accesoDatos.AccesoDatos;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import master.logica.entidades.MenuUrl;

public class FMenuUrl {

    public static MenuUrl obtenerUrlDadoMenu(int menu) throws Exception {
        MenuUrl mu = null;
        AccesoDatos accesoDatos;
        String sql;
        PreparedStatement prstm;
        ResultSet resultSet;
        try {
            accesoDatos = new AccesoDatos();
            sql = "SELECT * FROM sch_admin.f_obtener_url_dado_menu(?)";
            prstm = accesoDatos.creaPreparedSmt(sql);
            prstm.setInt(1, menu);
            resultSet = accesoDatos.ejecutaPrepared(prstm);
            while (resultSet.next()) {
                mu = new MenuUrl();
                mu.getUrl().setIdUrl(resultSet.getInt("sr_id_url"));
                mu.getUrl().setUrl(resultSet.getString("chv_url"));
                mu.getUrl().setNombre(resultSet.getString("nombre_url"));
            }
            accesoDatos.desconectar();
        } catch (Exception e) {
            throw e;
        }
        return mu;
    }
}
