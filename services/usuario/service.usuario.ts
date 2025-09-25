"use server"

import { editUsuarioParametros, insertUsuarioParametros } from "@/components/administrador/usuarios/types";
import CONFIG from "@/config";
import { fetchUsuarioPorCorreoDTO, fetchUsuariosDTO } from "@/lib/dtos/usuario";
import { getToken } from "@/lib/utils/getToken";

export async function fetchUsuarioPorCorreo(parametros: fetchUsuarioPorCorreoDTO) {
    try {
        const datosUsuarioParams = new URLSearchParams({
            correo: parametros.correo
        });

        const datosUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIOS}?${datosUsuarioParams.toString()}&accion=login`, {
            method: "GET"
        });
        
        if (!datosUsuarioRaw.ok) {
            const errorData = await datosUsuarioRaw.json();
            throw new Error(errorData.error || "Error en la respuesta del servidor");
        };

        const datosUsuario = await datosUsuarioRaw.json();

        return datosUsuario;
    } catch (error) {
        throw error;
    };
};

export async function fetchUsuarios(parametros: fetchUsuariosDTO) {
    try {
        const token = await getToken();

        const usuariosParametros = new URLSearchParams({
            busquedaNombre: parametros.busquedaNombre,
            pagina: parametros.pagina.toString(),
            filasPorPagina: parametros.filasPorPagina.toString(),
            columna: parametros.ordenColumna,
            direccion: parametros.ordenDireccion,
            filtroTipoUsuario: parametros.filtroTipoUsuario.toString() === '' ? '0' : parametros.filtroTipoUsuario.toString(),
        });

        const datosUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIOS}?${usuariosParametros.toString()}&accion=lista`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!datosUsuarioRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const datosUsuario = await datosUsuarioRaw.json();

        return datosUsuario;
    } catch (error) {
        throw error;
    };
};

export async function insertUsuario(parametros: insertUsuarioParametros) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_USUARIO}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parametros),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function deleteUsuario(id: number) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIO!.replace("{id}", id!.toString())}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function editUsuario(parametros: editUsuarioParametros) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIO!.replace("{id}", parametros.id!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                accion: "editar",
                nombre: parametros.nombre,
                correo: parametros.correo,
                id_tipousuario: parametros.id_tipousuario,
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        throw error;
    };
};