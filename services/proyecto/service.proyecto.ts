"use server"

import CONFIG from "@/config";
import { deleteProyectoDTO, editProyectoDTO, fetchProyectosABMDTO, insertProyectoDTO } from "@/lib/dtos/proyecto";
import { getToken } from "@/lib/utils/getToken";

export async function fetchProyectos() {
    try {
        const token = await getToken();

        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTOS}?accion=select`, {
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

export async function fetchProyectosABM(parametros: fetchProyectosABMDTO) {
    try {
        const token = await getToken();

        const proyectosParametros = new URLSearchParams({
            pagina: parametros.pagina != null ? parametros.pagina.toString() : '',
            filasPorPagina: parametros.filasPorPagina != null ? parametros.filasPorPagina.toString() : '',
        });

        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTOS}?${proyectosParametros.toString()}&accion=abm`, {
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

export async function insertProyecto(parametros: insertProyectoDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_CREAR_PROYECTO}`, {
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

export async function deleteProyecto(parametros: deleteProyectoDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO!.replace("{id}", parametros.id_proyecto!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                accion: "baja",
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

export async function editProyecto(parametros: editProyectoDTO) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO!.replace("{id}", parametros.id_proyecto!.toString())}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                accion: "editar",
                nombre: parametros.nombre,
                id_modalidadtrabajo: parametros.id_modalidadtrabajo,
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