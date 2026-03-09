"use server"

import CONFIG from "@/config";
import { DeleteProyectoDto, EditProyectoDto, FetchProyectosPaginatedDto, CreateProyectoDto } from "@/lib/dtos/proyecto";
import { getToken } from "@/lib/utils/getToken";

export async function fetchProyectos() {
    try {
        const token = await getToken();

        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!proyectosRaw.ok) {
            throw new Error(`Error fetching proyectos: ${proyectosRaw.status} - ${proyectosRaw.statusText}`);
        };

        const proyectos = await proyectosRaw.json();

        return proyectos;
    } catch (error) {
        console.error('Fetch proyectos failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function fetchProyectosPaginated(params: FetchProyectosPaginatedDto) {
    try {
        const token = await getToken();

        const proyectosUrlParams = new URLSearchParams({
            page: params.pagina.toString(),
            limit: params.filasPorPagina.toString(),
        });

        const proyectosRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO}/paginated?${proyectosUrlParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!proyectosRaw.ok) {
            throw new Error(`Error fetching proyectos: ${proyectosRaw.status} - ${proyectosRaw.statusText}`);
        };

        const proyectos = await proyectosRaw.json();

        return proyectos;
    } catch (error) {
        console.error('Fetch proyectos failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function createProyecto(params: CreateProyectoDto) { //PENDING añadir nomina a parametros y formulario
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error creating proyecto: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Create proyecto failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteProyecto(params: DeleteProyectoDto) {
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO}/${params.id_proyecto}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error deleting proyecto with id ${params.id_proyecto}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Delete proyecto failed: ', {
            id: params.id_proyecto,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editProyecto(params: EditProyectoDto) { //PENDING añadir nomina
    try {
        const token = await getToken();

        const respuestaRaw = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO}/${params.id_proyecto}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: params.nombre,
                id_modalidadtrabajo: params.id_modalidadtrabajo,
                nomina: params.nomina
            }),
        });

        if (!respuestaRaw.ok) {
            throw new Error(`Error editing proyecto with id ${params.id_proyecto}: ${respuestaRaw.status} - ${respuestaRaw.statusText}`);
        };

        const respuesta = await respuestaRaw.json();

        return respuesta;
    } catch (error) {
        console.error('Edit proyecto failed: ', {
            id: params.id_proyecto,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};