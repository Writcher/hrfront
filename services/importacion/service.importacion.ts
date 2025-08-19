"use server"

import CONFIG from "@/config";
import { fetchImportacionesParams, fetchImportacionJornadasParams } from "@/lib/dtos/importaciones";

export async function fetchImportaciones(params: fetchImportacionesParams) {
    try {
        const datosImportacionesParams = new URLSearchParams({
            filtroIncompletas: params.filtroIncompletas.toString(),
            filtroProyecto: params.filtroProyecto.toString() === '' ? '0' : params.filtroProyecto.toString(),
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

export async function fetchImportacionJornadas(params: fetchImportacionJornadasParams) {
    try {
        const datosImportacionJornadasParams = new URLSearchParams({
            filtroMarcasIncompletas: params.filtroMarcasIncompletas.toString(),
            pagina: params.pagina.toString(),
            filasPorPagina: params.filasPorPagina.toString()
        });

        const importacionJornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACIONJORNADAS!.replace("{id}", params.idImportacion!.toString())}?${datosImportacionJornadasParams.toString()}`, {
            method: "GET"
        });

        const importacionJornadas = await importacionJornadasRaw.json();

        return importacionJornadas;
    } catch (error) {
        throw error;
    };
};

export async function setImportacionCompleta(id: number) {
    try {
        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION!.replace("{id}", id!.toString())}`, {
            method: "PATCH"
        });

        const respuesta = await respuestaRaw.json()

        return respuesta;
    } catch (error) {
        throw error;
    };
};