package master.presentacion.beans;

import java.io.Serializable;
import java.util.List;
import java.util.ResourceBundle;
import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import master.logica.entidades.Menu;
import master.logica.funciones.FMenu;
import master.logica.funciones.FMenuUrl;
import org.primefaces.model.menu.DefaultMenuItem;
import org.primefaces.model.menu.DefaultMenuModel;
import org.primefaces.model.menu.DefaultSubMenu;
import org.primefaces.model.menu.MenuModel;
import recursos.Util;

@ManagedBean
@ViewScoped
public class CtMenuTemplate implements Serializable {

    private HttpServletRequest httpServletRequest;
    private FacesContext faceContext;
    private MenuModel menu;
    private String paginaActual;
    private java.util.ResourceBundle Configuracion = java.util.ResourceBundle.getBundle("recursos.DatosAplicacion");

    public CtMenuTemplate() {
        paginaActual = "home.jsf";
        menu = new DefaultMenuModel();
        faceContext = FacesContext.getCurrentInstance();
        httpServletRequest = (HttpServletRequest) faceContext.getExternalContext().getRequest();
    }

    @PostConstruct
    public void init() {
        crearMenu();
    }

    public void crearMenu() {
        try {
            int idRol = (int) httpServletRequest.getSession().getAttribute("idRol");
            int idPadre;

            DefaultSubMenu subMenu;
            DefaultMenuItem item;

            List<Menu> submenus = FMenu.obtenerMenusDadoRol(idRol);
            List<Menu> hijos;

            item = new DefaultMenuItem("Inicio");
            item.setIcon("home");
            item.setUrl("/privado/home.jsf");
            menu.addElement(item);

            for (int s = 0; s < submenus.size(); s++) {

                idPadre = submenus.get(s).getIdMenu();
                hijos = FMenu.obtenerMenusDadoPadre(idPadre);
                if (hijos.isEmpty()) {
                    item = new DefaultMenuItem(submenus.get(s).getNombre());
                    item.setIcon(submenus.get(s).getIcono());

                    item.setCommand("#{CtMenuTemplate.obtenerUrlDadoMenu("
                            + submenus.get(s).getIdMenu()
                            + ")}");
                    menu.addElement(item);
                } else {
                    subMenu = new DefaultSubMenu(submenus.get(s).getNombre());
                    subMenu.setIcon(submenus.get(s).getIcono());
                    for (int h = 0; h < hijos.size(); h++) {
                        item = new DefaultMenuItem(hijos.get(h).getNombre());
                        item.setIcon(hijos.get(h).getIcono());
                        item.setCommand("#{ctMenuTemplate.obtenerUrlDadoMenu("
                                + hijos.get(h).getIdMenu()
                                + ")}");
                        subMenu.addElement(item);
                    }
                    menu.addElement(subMenu);
                }
            }
        } catch (Exception e) {
            Util.addErrorMessage("public void crearMenu() dice: " + e.getMessage());
        }
    }

    public void obtenerUrlDadoMenu(int idMenuSel) {
        try {
            System.out.println("id Menu: " + idMenuSel);
            String rutaGeneral = "/" + Configuracion.getString("Aplicacion");
            System.out.println("Ruta Genral: " + rutaGeneral);
            FacesContext fc = FacesContext.getCurrentInstance();

            if (FMenuUrl.obtenerUrlDadoMenu(idMenuSel) == null) {
                Util.addErrorMessage("Este menú no tiene una Url asignada.");
                paginaActual = rutaGeneral + "/privado/home.jsf";
            } else {
                Util.addSuccessMessage("Redirigiendo a: " + FMenuUrl.obtenerUrlDadoMenu(idMenuSel).getUrl().getNombre());
                paginaActual = rutaGeneral + FMenuUrl.obtenerUrlDadoMenu(idMenuSel).getUrl().getUrl();
            }
            System.out.println("Pagina a buscar: " + paginaActual);
            fc.getExternalContext().redirect(paginaActual);
        } catch (Exception e) {
            //Util.addErrorMessage("public void obtenerUrlDadoItem() dice: " + e.getMessage());
            FacesMessage facesMsg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Este item no tiene URL asociada", "Consulte con el administrador");
            FacesContext.getCurrentInstance().addMessage(null, facesMsg);
        }

    }

    public HttpServletRequest getHttpServletRequest() {
        return httpServletRequest;
    }

    public void setHttpServletRequest(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }

    public FacesContext getFaceContext() {
        return faceContext;
    }

    public void setFaceContext(FacesContext faceContext) {
        this.faceContext = faceContext;
    }

    public MenuModel getMenu() {
        return menu;
    }

    public void setMenu(MenuModel menu) {
        this.menu = menu;
    }

    public String getPaginaActual() {
        return paginaActual;
    }

    public void setPaginaActual(String paginaActual) {
        this.paginaActual = paginaActual;
    }

    public ResourceBundle getConfiguracion() {
        return Configuracion;
    }

    public void setConfiguracion(ResourceBundle Configuracion) {
        this.Configuracion = Configuracion;
    }

}
