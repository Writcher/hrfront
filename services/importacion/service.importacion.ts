"use server"

import CONFIG from "@/config";
import { deleteImportacionDTO } from "@/lib/dtos/importacion";
import { fetchImportacionesParams, fetchImportacionJornadasParams } from "@/lib/dtos/importaciones";
import { getToken } from "@/lib/utils/getToken";

export async function fetchImportaciones(params: fetchImportacionesParams) {
    try {
        const token = await getToken();

        const datosImportacionesParams = new URLSearchParams({
            filtroIncompletas: params.filtroIncompletas.toString(),
            filtroProyecto: params.filtroProyecto.toString() === '' ? '0' : params.filtroProyecto.toString(),
            pagina: params.pagina.toString(),
            filasPorPagina: params.filasPorPagina.toString(),
        });

        const datosImportacionesRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACIONES}?${datosImportacionesParams.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
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
        const token = await getToken();

        const datosImportacionJornadasParams = new URLSearchParams({
            pagina: params.pagina.toString(),
            filasPorPagina: params.filasPorPagina.toString()
        });

        const importacionJornadasRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACIONJORNADAS!.replace("{id}", params.idImportacion!.toString())}?${datosImportacionJornadasParams.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const importacionJornadas = await importacionJornadasRaw.json();

        return importacionJornadas;
    } catch (error) {
        throw error;
    };
};

export async function setImportacionCompleta(id: number) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION!.replace("{id}", id!.toString())}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const respuesta = await respuestaRaw.json()

        return respuesta;
    } catch (error) {
        throw error;
    };
};

export async function deleteImportacion(parametros: deleteImportacionDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION!.replace("{id}", parametros.id!.toString())}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
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
