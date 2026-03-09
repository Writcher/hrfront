"use server"

import CONFIG from "@/config";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposImportacion() {
    try {
        const token = await getToken();

        const tiposImportacionRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOIMPORTACION}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposImportacionRaw.ok) {
            throw new Error(`Error fetching tiposImportacion: ${tiposImportacionRaw.status} - ${tiposImportacionRaw.statusText}`);
        };

        const tiposImportacion = await tiposImportacionRaw.json();

        return tiposImportacion;
    } catch (error) {
        console.error('Fetch tiposImportacion failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};