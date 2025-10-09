"use server"

import CONFIG from "@/config";
import { fetchTipoUsuarioPorIdDTO } from "@/lib/dtos/tipousuario";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTipoUsuarioPorId(parametros: fetchTipoUsuarioPorIdDTO) {
    try {
        const tipoUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOUSUARIO!.replace("{id}", parametros.id!.toString())}`, {
            method: "GET"
        });

        if (!tipoUsuarioRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const tipoUsuario = await tipoUsuarioRaw.json();

        return tipoUsuario;
    } catch (error) {
        throw error;
    };
};

export async function fetchTiposUsuario() {
    try {
        const token = await getToken();
        
        const tiposUsuarioRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSUSUARIO}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposUsuarioRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const tiposUsuario = await tiposUsuarioRaw.json();

        return tiposUsuario;
    } catch (error) {
        throw error;
    };
};