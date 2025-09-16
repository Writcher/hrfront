"use server"

import { insertObservacionDatos } from "@/components/administrativo/jornadas/types";
import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function insertObservacion(parametros: insertObservacionDatos) {
    try {
        const token = await getToken();

        const datos = {
            observacion: parametros.observacion
        };

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_OBSERVACION!.replace("{id}", parametros.id_jornada!.toString())}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos),
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