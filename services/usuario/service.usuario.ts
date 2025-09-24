"use server"

import CONFIG from "@/config";
import { fetchUsuarioPorCorreoDTO } from "@/lib/dtos/usuario";

export async function fetchUsuarioPorCorreo(parametros: fetchUsuarioPorCorreoDTO) {
    try {
        const datosUsuarioParams = new URLSearchParams({
            correo: parametros.correo
        });

        const datosUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_USUARIOS}?${datosUsuarioParams.toString()}`, {
            method: "GET"
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