package recursos;

import java.util.Date;

public class ConvertirFechas {

    public static java.sql.Date devolverFecha(Date txtFecha) {
        java.sql.Date auxFecha = null;
        String strFecha = new String();
        try {
            java.text.SimpleDateFormat sdf1 = new java.text.SimpleDateFormat("yyyy-MM-dd");
            strFecha = sdf1.format(txtFecha);

            Date fecha = sdf1.parse(strFecha);
            java.sql.Date retornoFecha = new java.sql.Date(fecha.getTime());
            auxFecha = retornoFecha;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return auxFecha;
    }

    public static java.sql.Time devolverHora(Date txtFecha) {
        java.sql.Time auxFecha = null;
        String strFecha = new String();
        try {
            java.text.SimpleDateFormat sdf1 = new java.text.SimpleDateFormat("hh:mm:ss");
            strFecha = sdf1.format(txtFecha);

            Date fecha = sdf1.parse(strFecha);
            java.sql.Time retornoFecha = new java.sql.Time(fecha.getTime());
            auxFecha = retornoFecha;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return auxFecha;
    }

}
