"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposAusencia() {
    try {
        const token = await getToken();
            
        const tiposAusenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSAUSENCIA}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
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