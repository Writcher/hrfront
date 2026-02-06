"use server"

import CONFIG from "@/config";
import { createTipoAusencialDTO, deleteTipoAusenciaDTO, editTipoAusenciaDTO, fetchTiposAusenciaPaginatedDTO } from "@/lib/dtos/tipoausencia";
import { getToken } from "@/lib/utils/getToken";

export async function fetchTiposAusencia() {
    try {
        const token = await getToken();
            
        const tiposAusenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}`, {
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

export async function fetchTiposAusenciaPaginated(parametros: fetchTiposAusenciaPaginatedDTO) {
    try {
        const token = await getToken();

        const tiposAusenciaParametros = new URLSearchParams({
            page: parametros.pagina?.toString() ?? '',
            limit: parametros.filasPorPagina?.toString() ?? '',
        });

        const tiposAusenciaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}/paginated?${tiposAusenciaParametros.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!tiposAusenciaRaw.ok) {
            throw new Error("Error en alguna de las respuestas del servidor");
        };

        const tiposAusencia = await tiposAusenciaRaw.json();

        return tiposAusencia;
    } catch (error) {
        throw error;
    };
};

export async function insertTipoAusencia(parametros: createTipoAusencialDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parametros),
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

export async function deleteTipoAusencia(parametros: deleteTipoAusenciaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}/${parametros.id_tipoausencia}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
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

export async function editTipoAusencia(parametros: editTipoAusenciaDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}/${parametros.id_tipoausencia}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: parametros.nombre,
            }),
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