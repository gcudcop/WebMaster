package master.logica.entidades;

import java.util.ArrayList;
import java.util.List;

public class NodoMenu {

    private Menu menu;
    private String url;
    private List<NodoMenu> hijos;

    public NodoMenu() {
        this.menu = new Menu();
        this.url = "";
        this.hijos = new ArrayList<>();
    }

    /**
     * @return the menu
     */
    public Menu getMenu() {
        return menu;
    }

    /**
     * @param menu the menu to set
     */
    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return the hijos
     */
    public List<NodoMenu> getHijos() {
        return hijos;
    }

    /**
     * @param hijos the hijos to set
     */
    public void setHijos(List<NodoMenu> hijos) {
        this.hijos = hijos;
    }

}
