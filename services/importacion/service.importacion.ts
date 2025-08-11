"use server"

import CONFIG from "@/config";
import { fetchImportacionesParams } from "@/lib/dtos/importaciones";

export async function fetchImportaciones(params: fetchImportacionesParams) {
    try {
        const datosImportacionesParams = new URLSearchParams({
            filtroIncompletas: params.filtroIncompletas.toString(),
            filtroProyecto: params.filtroProyecto.toString(),
            pagina: params.pagina.toString(),
            filasPorPagina: params.filasPorPagina.toString(),
        });

        const datosImportacionesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACIONES}?${datosImportacionesParams.toString()}`, {
            method: "GET"
        });

        if (!datosImportacionesRaw.ok) {
            throw new Error("Error en la respuesta del servidor");
        };

        const datosEmpleados = await datosImportacionesRaw.json();

        return datosEmpleados;

    } catch (error) {
        throw error;
    };
};