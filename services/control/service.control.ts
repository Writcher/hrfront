"use server"

import CONFIG from "@/config";
import { createControlDTO, deleteControlDTO, editControlDTO, fetchControlesABMDTO } from "@/lib/dtos/control";
import { getToken } from "@/lib/utils/getToken";

export async function fetchControlesABM(parametros: fetchControlesABMDTO) {
    try {
        const token = await getToken();

        const proyectosParametros = new URLSearchParams({
            pagina: parametros.pagina != null ? parametros.pagina.toString() : '',
            filasPorPagina: parametros.filasPorPagina != null ? parametros.filasPorPagina.toString() : '',
        });

        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROLES}?${proyectosParametros.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!proyectosRaw.ok) {
            throw new Error("Error en alguna de las respuestas del servidor");
        };

        const proyectos = await proyectosRaw.json();

        return proyectos;
    } catch (error) {
        throw error;
    };
};

export async function insertControl(parametros: createControlDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_CONTROL}`, {
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

export async function deleteControl(parametros: deleteControlDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROL!.replace("{id}", parametros.id_control!.toString())}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
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

export async function editControl(parametros: editControlDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CONTROL!.replace("{id}", parametros.id_control!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                serie: parametros.serie,
                id_proyecto: parametros.id_proyecto
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