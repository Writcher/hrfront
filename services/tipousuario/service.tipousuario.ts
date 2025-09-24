"use server"

import CONFIG from "@/config";
import { fetchTipoUsuarioPorIdDTO } from "@/lib/dtos/tipousuario";

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