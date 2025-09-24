"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposImportacion() {
    try {
        const token = await getToken();

        const tiposImportacionRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOSIMPORTACION}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposImportacionRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const tiposImportacion = await tiposImportacionRaw.json();

        return tiposImportacion;
    } catch (error) {
        throw error;
    };
};