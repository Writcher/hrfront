"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposJornada() {
    try {
        const token = await getToken();

        const tiposJornadaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSJORNADA}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
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