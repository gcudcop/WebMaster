/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package master.logica.entidades;

import java.sql.Timestamp;

/**
 *
 * @author Geovanny
 */
public class RolUsuario {

    private Rol rol;
    private Usuario usuario;
    private int privInsertar;
    private int privEditar;
    private int privEliminar;
    private int privSeleccionar;
    private String estadoLogico;
    private Timestamp fechaRegistro;
    private Timestamp fechaBaja;
    private Usuario sessionUsuario;

    public RolUsuario() {
        rol = new Rol();
        usuario = new Usuario();
        sessionUsuario = new Usuario();
    }

    /**
     * @return the rol
     */
    public Rol getRol() {
        return rol;
    }

    /**
     * @param rol the rol to set
     */
    public void setRol(Rol rol) {
        this.rol = rol;
    }

    /**
     * @return the usuario
     */
    public Usuario getUsuario() {
        return usuario;
    }

    /**
     * @param usuario the usuario to set
     */
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    /**
     * @return the privInsertar
     */
    public int getPrivInsertar() {
        return privInsertar;
    }

    /**
     * @param privInsertar the privInsertar to set
     */
    public void setPrivInsertar(int privInsertar) {
        this.privInsertar = privInsertar;
    }

    /**
     * @return the privEditar
     */
    public int getPrivEditar() {
        return privEditar;
    }

    /**
     * @param privEditar the privEditar to set
     */
    public void setPrivEditar(int privEditar) {
        this.privEditar = privEditar;
    }

    /**
     * @return the privEliminar
     */
    public int getPrivEliminar() {
        return privEliminar;
    }

    /**
     * @param privEliminar the privEliminar to set
     */
    public void setPrivEliminar(int privEliminar) {
        this.privEliminar = privEliminar;
    }

    /**
     * @return the privSeleccionar
     */
    public int getPrivSeleccionar() {
        return privSeleccionar;
    }

    /**
     * @param privSeleccionar the privSeleccionar to set
     */
    public void setPrivSeleccionar(int privSeleccionar) {
        this.privSeleccionar = privSeleccionar;
    }

    /**
     * @return the estadoLogico
     */
    public String getEstadoLogico() {
        return estadoLogico;
    }

    /**
     * @param estadoLogico the estadoLogico to set
     */
    public void setEstadoLogico(String estadoLogico) {
        this.estadoLogico = estadoLogico;
    }

    /**
     * @return the fechaRegistro
     */
    public Timestamp getFechaRegistro() {
        return fechaRegistro;
    }

    /**
     * @param fechaRegistro the fechaRegistro to set
     */
    public void setFechaRegistro(Timestamp fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    /**
     * @return the fechaBaja
     */
    public Timestamp getFechaBaja() {
        return fechaBaja;
    }

    /**
     * @param fechaBaja the fechaBaja to set
     */
    public void setFechaBaja(Timestamp fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    /**
     * @return the sessionUsuario
     */
    public Usuario getSessionUsuario() {
        return sessionUsuario;
    }

    /**
     * @param sessionUsuario the sessionUsuario to set
     */
    public void setSessionUsuario(Usuario sessionUsuario) {
        this.sessionUsuario = sessionUsuario;
    }

}
