"use server"

import CONFIG from "@/config";

export async function fetchTiposAusencia() {
    try {
        const tiposAusenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSAUSENCIA}`, {
            method: "GET"
        });

        if (!tiposAusenciaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const tiposAusencia = await tiposAusenciaRaw.json();

        return tiposAusencia;
    } catch (error) {
        throw error;
    };
};