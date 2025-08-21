"use server"

import CONFIG from "@/config";

export async function fetchTiposJornada() {
    try {
        const tiposJornadaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSJORNADA}`, {
            method: "GET"
        });

        if (!tiposJornadaRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const tiposJornada = await tiposJornadaRaw.json();

        return tiposJornada;
    } catch (error) {
        throw error;
    };
};