"use server";

import CONFIG from "@/config";
import { ImportHikVisionDto, ImportProsoftDto } from "@/lib/dtos/importar";
import { getToken } from "@/lib/utils/getToken";

export async function importProsoft(params: ImportProsoftDto) {
    try {
        const token = await getToken();

        const formData = new FormData();

        formData.append("file", params.archivo);
        formData.append("id_proyecto", params.proyecto.toString());
        formData.append("id_tipojornada", params.tipoJornada.toString());

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTAR}/prosoft`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error importing prosoft Excel report: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Import prosoft failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function importHikVision(params: ImportHikVisionDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTAR}/hikvision`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_tipojornada: params.tipoJornada,
                fecha: params.fecha,
                id_proyecto: params.proyecto
            })
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error importing HikVision report: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Import hikvision failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};