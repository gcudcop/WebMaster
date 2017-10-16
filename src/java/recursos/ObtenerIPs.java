package recursos;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;

public class ObtenerIPs {

    public static String obtenerIpPublica() throws MalformedURLException, IOException {
        String ip = null;
        try {
            URL whatismyip = new URL("http://checkip.amazonaws.com");
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    whatismyip.openStream()));
            ip = in.readLine();
        } catch (Exception e) {
            throw e;
        }
        return ip;
    }

    public static String obtenerIpLocal() throws Exception {
        String ip = null;
        try {
            InetAddress thisIp = InetAddress.getLocalHost();
            ip = thisIp.getHostAddress().toString();
        } catch (Exception e) {
            throw e;
        }
        return ip;
    }

    public static String obtenerNombreEquipo() throws Exception {
        String pc = null;
        try {
            InetAddress address = InetAddress.getLocalHost();
            pc = address.getHostName();
        } catch (Exception e) {
            throw e;
        }
        return pc;
    }

}
