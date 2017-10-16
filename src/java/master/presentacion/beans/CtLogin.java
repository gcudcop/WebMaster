/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package master.presentacion.beans;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import master.logica.entidades.RolUsuario;
import master.logica.entidades.Usuario;
import master.logica.funciones.FRolUsuario;
import master.logica.funciones.FUsuario;
import recursos.Util;

@ManagedBean
@RequestScoped
public class CtLogin implements Serializable {

    private String txtUsuario;
    private String txtPassword;
    private Usuario usuario;
    private HttpServletRequest httpServletRequest;
    private FacesContext faceContext;
    private FacesMessage facesMessage;
    private List<RolUsuario> lstRoles;
    private java.util.ResourceBundle Configuracion = java.util.ResourceBundle.getBundle("recursos.DatosAplicacion");

    public CtLogin() {
        usuario = new Usuario();
        faceContext = FacesContext.getCurrentInstance();
        httpServletRequest = (HttpServletRequest) faceContext.getExternalContext().getRequest();
    }

    public void login() {
        try {
            usuario = FUsuario.loginUsuario(txtUsuario, txtPassword);
            Util.addSuccessMessage("Bienvenido: " + usuario.getNombres() + " " + usuario.getApellidos());

            httpServletRequest.getSession().setAttribute("UsuarioLogueado", usuario);
            httpServletRequest.getSession().setAttribute("Datos", usuario.getNombres() + " " + usuario.getApellidos());

            lstRoles = FRolUsuario.obtenerRolesDadoUsuario(usuario.getIdPersona());
            if (lstRoles.size() > 1) {
                httpServletRequest.getSession().setAttribute("totalRoles", lstRoles.size()); //total de roles
                faceContext.getExternalContext().redirect("privado/rol.jsf");
            } else if (lstRoles.size() == 1) {
                RolUsuario ru = lstRoles.get(0);
                httpServletRequest.getSession().setAttribute("idRol", ru.getRol().getIdRol());
                httpServletRequest.getSession().setAttribute("rol", ru.getRol().getRol());
                faceContext.getExternalContext().redirect("privado/home.jsf");
            } else {
                Util.addErrorMessage("El Usuario no tiene roles activos en el sistema.");
                faceContext.getExternalContext().redirect("index.jsf");
            }

        } catch (Exception e) {
            Util.addErrorMessage(e.getMessage().replace("\n", "").replace("Hint:", ""));
        }
    }

    public void cerrarSesion() throws Exception {
        try {
            httpServletRequest.getSession().removeAttribute("UsuarioLogueado");
            httpServletRequest.getSession().removeAttribute("Datos");
            httpServletRequest.getSession().removeAttribute("totalRoles");

            System.gc();  //limpiar todo
            FacesContext fc = FacesContext.getCurrentInstance();

            Util.addSuccessMessage("Sesión cerrada");
            HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false);
            session.invalidate();

            fc.getExternalContext().redirect("/" + Configuracion.getString("Aplicacion")+"/index.jsf");
            fc.getExternalContext().invalidateSession();
        } catch (Exception ex) {
            Util.addErrorMessage(ex.getMessage().replace("\n", "").replace("Hint:", ""));
        }
    }

    /**
     * @return the txtUsuario
     */
    public String getTxtUsuario() {
        return txtUsuario;
    }

    /**
     * @param txtUsuario the txtUsuario to set
     */
    public void setTxtUsuario(String txtUsuario) {
        this.txtUsuario = txtUsuario;
    }

    /**
     * @return the txtPassword
     */
    public String getTxtPassword() {
        return txtPassword;
    }

    /**
     * @param txtPassword the txtPassword to set
     */
    public void setTxtPassword(String txtPassword) {
        this.txtPassword = txtPassword;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public FacesMessage getFacesMessage() {
        return facesMessage;
    }

    public void setFacesMessage(FacesMessage facesMessage) {
        this.facesMessage = facesMessage;
    }

}
